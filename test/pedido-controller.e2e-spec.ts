import { Server } from 'http';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { JwtService } from '@nestjs/jwt';
import { EmpacotarPedidosResponseDTO } from '../src/empacotamento/api/http/rest/dtos/empacotar-pedido-response.dto';
import { AppModule } from '../src/app.module';

describe('PedidoController (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );
    await app.init();

    jwtService = moduleFixture.get<JwtService>(JwtService);
    token = jwtService.sign({ serviceId: 'test-service' }, { expiresIn: '1h' });
  });

  afterAll(async () => {
    await app.close();
  });

  function getServer(): ReturnType<INestApplication['getHttpServer']> {
    return app.getHttpServer();
  }

  it('/pedidos/empacotar (POST) - retorna dados com sucesso', async () => {
    const body = {
      pedidos: [
        {
          pedido_id: 'pedido1',
          produtos: [
            {
              produto_id: 'p1',
              dimensoes: { altura: 5, largura: 5, comprimento: 5 },
            },
            {
              produto_id: 'p2',
              dimensoes: { altura: 9, largura: 9, comprimento: 9 },
            },
          ],
        },
      ],
    };

    const response = await request(getServer() as Server)
      .post('/pedidos/empacotar')
      .set('Authorization', `Bearer ${token}`)
      .send(body)
      .expect(201);

    const responseBody = response.body as EmpacotarPedidosResponseDTO;

    expect(responseBody.pedidos).toHaveLength(1);

    const pedido = responseBody.pedidos[0];
    expect(pedido.pedido_id).toBe('pedido1');
    expect(pedido.caixas).toHaveLength(1);
    expect(pedido.caixas[0].produtos).toEqual(['p1', 'p2']);
    expect(pedido.caixas[0].caixa_id).toBeDefined();
    expect(pedido.caixas[0].observacao).toBeUndefined();
  });

  it('/pedidos/empacotar (POST) - produto que nao cabe retorna caixa null', async () => {
    const body = {
      pedidos: [
        {
          pedido_id: 'pedido2',
          produtos: [
            {
              produto_id: 'p1',
              dimensoes: { altura: 100, largura: 100, comprimento: 100 },
            },
          ],
        },
      ],
    };

    const response = await request(getServer() as Server)
      .post('/pedidos/empacotar')
      .set('Authorization', `Bearer ${token}`)
      .send(body)
      .expect(201);

    const responseBody = response.body as EmpacotarPedidosResponseDTO;

    const caixa = responseBody.pedidos[0].caixas[0];
    expect(caixa.caixa_id).toBeNull();
    expect(caixa.observacao).toBe(
      'Produto não cabe em nenhuma caixa disponível.',
    );
  });

  it('/pedidos/empacotar (POST) - tentativa de acessar rota sem token retorna 401', async () => {
    const body = {
      pedidos: [
        {
          pedido_id: 'pedido3',
          produtos: [
            {
              produto_id: 'p1',
              dimensoes: { altura: 5, largura: 5, comprimento: 5 },
            },
          ],
        },
      ],
    };

    await request(getServer() as Server)
      .post('/pedidos/empacotar')
      .send(body)
      .expect(401);
  });
});
