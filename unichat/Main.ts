import { Conta } from "./Conta"
import { Feed } from "./Feed"
import { Post } from "./Post"
import * as readlineSync from 'readline-sync';

function main() {
    const redeSocial = new Feed()  // cria nova instância da classe Feed, 
                                   //que é responsável por gerenciar contas e posts na rede social.
    let contaLogada: Conta | null = null
                                  // variável contaLogada é declarada. Ela é do tipo Conta ou null, 
                                  // o que significa que ela pode armazenar uma instância de Conta (quando um usuário está logado) 
                                  // ou null (quando nenhum usuário está logado).
                                  // Inicialmente, contaLogada é definida como null porque, no início do programa, nenhum usuário está logado.

    while (true) {
        console.log('\n[01] Criar conta\n[02] Login\n[03] Logout\n[04] Criar post\n[05] Ver feed\n[06] Seguir usuário\n[07] Enviar mensagem\n[00] Sair')
        const escolha = readlineSync.question('Escolha opcao: ')

        switch (escolha) {
            case '01':
                contaLogada = redeSocial.criarConta()
                break
            case '02':
                contaLogada = redeSocial.login()
                break

            case '03':
                    if (contaLogada) {
                        redeSocial.logout()
                        contaLogada = null
                    } else {
                        console.log('Você não está logado.')
                    }

                
            case '04':
                if (contaLogada) {
                    const conteudo = readlineSync.question('Conteudo do post: ')
                    contaLogada.criarPost(conteudo)
                    console.log('Post criado com sucesso!')
                } else {
                    console.log('Você precisa estar logado para criar um post.')
                }
                break
            case '05':
                if (contaLogada) {
                    const posts = redeSocial.filtrarPosts(contaLogada)
                    if (posts.length > 0) {
                        posts.forEach(post => {
                            console.log(`Post ID: ${post.idPost}, Autor: ${post.idAutor}, Data: ${post.dataHora.join('/')}, Curtidas: ${post.curtidas.length}`)
                        })
                    } else {
                        console.log('Nenhum post encontrado no feed.')
                    }
                } else {
                    console.log('Você precisa estar logado para ver o feed.')
                }
                break
            case '06':
                if (contaLogada) {
                    const idParaSeguir = parseInt(readlineSync.question('ID da conta para seguir: '), 10)
                    const contaParaSeguir = redeSocial.contas.find(c => c.id === idParaSeguir)
                    if (contaParaSeguir) {
                        contaLogada.seguir(contaParaSeguir)
                        console.log(`Agora você está seguindo ${contaParaSeguir.nomeUsuario}.`)
                    } else {
                        console.log('Conta não encontrada.')
                    }
                } else {
                    console.log('Você precisa estar logado para seguir um usuário.')
                }
                break
            case '07':
                if (contaLogada) {
                    const idDestino = parseInt(readlineSync.question('ID da conta para enviar mensagem: '), 10)
                    const contaDestino = redeSocial.contas.find(c => c.id === idDestino)
                    if (contaDestino) {
                        const mensagem = readlineSync.question('Mensagem: ')
                        contaLogada.enviarMensagem(contaDestino, mensagem)
                        console.log('Mensagem enviada com sucesso!')
                    } else {
                        console.log('Conta não encontrada.')
                    }
                } else {
                    console.log('Você precisa estar logado para enviar uma mensagem.')
                }
                break
                case '00':
                    console.log('Encerrando o simulador...')
                    return

 //               case '00':
 //               if (contaLogada) {
 //                   redeSocial.logout()
 //                   contaLogada = null
 //               } else {
 //                   console.log('Você não está logado.')
  //              }
                break


                default:
                console.log('Opção inválida.')
        }
    }
}