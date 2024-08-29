import * as readlineSync from 'readline-sync';
import { Post } from './Post';

export class Conta {
    static idsUtilizados: number[] = [] // array estático para armazenar os IDs utilizados
    private id: number // ID único para cada conta
    private nomeUsuario: string // nome de usuário
    senha: string // senha para login
    informacaoAdicional: string // informações adicionais sobre o usuário
    seguidores: number[] // IDs das contas que seguem o usuário
    private seguindo: number[] // IDs das contas que o usuário atual segue
    private posts: Post[] // lista de posts feitos pelo usuário
    mensagensDiretas: [string, number][] // mensagens diretas recebidas, armazenando conteúdo e ID da conta remetente
    notificacoes: [string, number][] // notificações recebidas, com conteúdo e ID da conta que gerou a notificação

    constructor(nomeUsuario: string, senha: string, informacaoAdicional: string) {
        this.id = Conta.idsUtilizados.length + 1 // gera um novo ID com base no tamanho do array de IDs utilizados
        Conta.idsUtilizados.push(this.id) // adiciona o ID ao array de IDs utilizados
        this.nomeUsuario = nomeUsuario // define o nome de usuário
        this.senha = senha // define a senha do usuário
        this.informacaoAdicional = informacaoAdicional // define informações adicionais
        this.seguidores = [] // inicia o array de seguidores vazio
        this.seguindo = [] // inicia o array de contas seguidas vazio
        this.posts = [] // inicia o array de posts vazio
        this.mensagensDiretas = [] // inicia o array de mensagens diretas vazio
        this.notificacoes = [] // inicia o array de notificações vazio
    }

    getId() : number{
        return this.id
    }

    getSeguindo(): Array<number>{
        return this.seguindo
    }

    getPosts(): Array<Post>{
        return this.posts
    }

    getNomeUsuario(): string{
        return this.nomeUsuario
    }

    seguir(conta: Conta) {
        if (!this.seguindo.includes(conta.id)) { // verifica se o usuário já está seguindo a conta
            this.seguindo.push(conta.id) // adiciona o ID da conta ao array de contas seguidas
            conta.seguidores.push(this.id) // adiciona o ID do usuário ao array de seguidores da conta seguida
            conta.notificacoes.push(["Novo seguidor", this.id]) // envia uma notificação à conta seguida
        }
    }

    enviarMensagem(conta: Conta, conteudo: string) {
        conta.mensagensDiretas.push([conteudo, this.id]) // envia uma mensagem direta para a conta
    }

    criarPost(conteudo: string) {
        const novoPost = new Post(this.id, conteudo) // cria um novo post com o ID do autor e o conteúdo
        this.posts.push(novoPost) // adiciona o post à lista de posts do usuário
    }
}







