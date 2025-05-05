

export class FiltrosEmpresas {
  pagina: number;
  itensPorPagina: number;
  id: string;
  razaosocial: string;
  cpfoucnpj: string;
  naturezapessoa: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  nomecontato: string;
  telefone: string;
  whats: string;
  email: string;
  valor: string;
  datagravacaode: string;
  datagravacaoate: string;
  emailusuario: string;
  status: string;

}

export class FiltrosProdutos {
  pagina: number;
  itensPorPagina: number;
  id: string;
  sku: string;
  nome?: string;
  descricao?: string;
  preco?: string;
  categoria: string;
  datagravacaode: string;
  datagravacaoate: string;
  emailusuario: string;
  status?: string;
}

export class FiltrosPedidos {
  pagina: number;
  itensPorPagina: number;
  cliente?: string;
  produtos: string;
  tipoPedido: string;
  datagravacaode: string;
  datagravacaoate: string;
  emailusuario: string;
  status?: string;
} 

export class FiltroUsuarios {
  pagina: number;
  itensPorPagina: number;
  id: string;
  nome: string;
  status: string;
  telefone: string;
  email: string;
  login: string;
  datagravacaode: string;
  datagravacaoate: string;
  emailusuario: string;
}
