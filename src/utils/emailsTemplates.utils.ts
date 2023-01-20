export const RegisterNewUserEmail = (name, token) => {
  return `
  <!DOCTYPE html>
  <html lang="pt-BR">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        body {
          margin: 0;
          background-color: #ffff;
        }

        table {
          border-spacing: 0;
        }

        td {
          padding: 0;
        }

        .wrapper {
          display: table;
          table-layout: fixed;
          width: 100%;
          height: 100vh;
        }

        .main {
          margin: 0 auto;
          width: 100%;
          height: 100%;
          max-width: 600px;
          border-spacing: 0;
          font-family: sans-serif;
          color: #171a17;
        }

        a:link,
        #button-dark {
          display: block;
          background-color: #0094ff;
          color: #f0f3fa;
          text-decoration: none;
          padding: 12px 20px;
          border-radius: 5px;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <table class="main">
          <tr>
            <td style="padding: 0.5rem 2rem">
              <div
                style="
                  width: 100%;
                  background-color: #f0f3fa;
                  border: 1px solid transparent;
                  border-radius: 15px;
                  box-shadow: 12px 4px 6px #00000025;
                  padding: 1.5rem 3rem;
                "
              >
                <table>
                  <tr>
                    <td style="text-align: center; padding: 15px">
                      <p style="font-size: 20px; font-weight: bold">Bem vindo</p>
                      <hr />

                      <p
                        style="
                          line-height: 23px;
                          padding: 5px 0 15px;
                          text-align: center;
                          font-weight: bold;
                          font-size: large;
                        "
                      >
                        Olá, ${name}!
                      </p>
                      <p style="text-align: left">
                        Este e-mail é para informar que o seu usuário foi
                        cadastrado com sucesso na plataforma!
                      </p>

                      <p style="text-align: left">
                        Para acessar a plataforma como novo usuário clique no link
                        abaixo.
                      </p>
                      <a href="${process.env.PLATFORM_URL}/firstAccess/${token}" id="button-dark">Acessar a plataforma</a>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </body>
  </html>
  `;
};

export const SendEmailForgotPassword = (token) => {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body {
        margin: 0;
        background-color: #ffff;
      }

      table {
        border-spacing: 0;
      }

      td {
        padding: 0;
      }

      .wrapper {
        display: table;
        table-layout: fixed;
        width: 100%;
        height: 100vh;
      }

      .main {
        margin: 0 auto;
        width: 100%;
        height: 100%;
        max-width: 600px;
        border-spacing: 0;
        font-family: sans-serif;
        color: #171a17;
      }

      a:link,
      #button-dark {
        display: block;
        background-color: #0094ff;
        color: #f0f3fa;
        text-decoration: none;
        padding: 12px 20px;
        border-radius: 5px;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <table class="main">
        <tr>
          <td style="padding: 0.5rem 2rem">
            <div
              style="
                width: 100%;
                background-color: #f0f3fa;
                border: 1px solid transparent;
                border-radius: 15px;
                box-shadow: 12px 4px 6px #00000025;
                padding: 1.5rem 3rem;
              "
            >
              <table>
                <tr>
                  <td style="text-align: center; padding: 15px">
                    <p style="font-size: 20px; font-weight: bold">
                      Recuperação de senha!
                    </p>
                    <hr />

                    <p
                      style="
                        line-height: 23px;
                        padding: 5px 0 15px;
                        text-align: center;
                        font-weight: bold;
                        font-size: large;
                      "
                    >
                      Caro usuário(a)
                    </p>
                    <p style="text-align: left">
                      Este e-mail é para a recuperação do seu acesso a
                      plataforma SAMI.
                    </p>

                    <p style="text-align: left">
                      Ao clicar no botão abaixo você será redirecionado para a
                      tela de recuperação/troca de senha.
                    </p>
                    <a href="${process.env.PLATFORM_URL}/changePassword/${token}" id="button-dark">Redefinir acesso</a>
                  </td>
                </tr>
              </table>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>
  `;
};

export const ChangePasswordEmail = () => {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body {
        margin: 0;
        background-color: #ffff;
      }

      table {
        border-spacing: 0;
      }

      td {
        padding: 0;
      }

      .wrapper {
        display: table;
        table-layout: fixed;
        width: 100%;
        height: 100vh;
      }

      .main {
        margin: 0 auto;
        width: 100%;
        height: 100%;
        max-width: 600px;
        border-spacing: 0;
        font-family: sans-serif;
        color: #171a17;
      }

      a:link,
      #button-dark {
        display: block;
        background-color: #0094ff;
        color: #f0f3fa;
        text-decoration: none;
        padding: 12px 20px;
        border-radius: 5px;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <table class="main">
        <tr>
          <td style="padding: 0.5rem 2rem">
            <div
              style="
                width: 100%;
                background-color: #f0f3fa;
                border: 1px solid transparent;
                border-radius: 15px;
                box-shadow: 12px 4px 6px #00000025;
                padding: 1.5rem 3rem;
              "
            >
              <table>
                <tr>
                  <td style="text-align: center; padding: 15px">
                    <p style="font-size: 20px; font-weight: bold">
                      Senha de acesso alterada
                    </p>
                    <hr />

                    <p
                      style="
                        line-height: 23px;
                        padding: 5px 0 15px;
                        text-align: center;
                        font-weight: bold;
                        font-size: large;
                      "
                    >
                      Caro usuário(a)
                    </p>
                    <p style="text-align: left">
                      Este e-mail é informar que a senha de acesso ao seu perfil da plataforma foi alterado com sucesso.
                    </p>
                  </td>
                </tr>
              </table>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>
  `;
};

export const ChangeEmail = (name, email, password, token) => {
  return `
  <!DOCTYPE html>
  <html lang="pt-BR">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        body {
          margin: 0;
          background-color: #ffff;
        }

        table {
          border-spacing: 0;
        }

        td {
          padding: 0;
        }

        .wrapper {
          display: table;
          table-layout: fixed;
          width: 100%;
          height: 100vh;
        }

        .main {
          margin: 0 auto;
          width: 100%;
          height: 100%;
          max-width: 600px;
          border-spacing: 0;
          font-family: sans-serif;
          color: #171a17;
        }

        a:link,
        #button-dark {
          display: block;
          background-color: #0094ff;
          color: #f0f3fa;
          text-decoration: none;
          padding: 12px 20px;
          border-radius: 5px;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <table class="main">
          <tr>
            <td style="padding: 0.5rem 2rem">
              <div
                style="
                  width: 100%;
                  background-color: #f0f3fa;
                  border: 1px solid transparent;
                  border-radius: 15px;
                  box-shadow: 12px 4px 6px #00000025;
                  padding: 1.5rem 3rem;
                "
              >
                <table>
                  <tr>
                    <td style="text-align: center; padding: 15px">
                      <p style="font-size: 20px; font-weight: bold">
                        Alteração do E-mail.
                      </p>
                      <hr />

                      <p
                        style="
                          line-height: 23px;
                          padding: 5px 0 15px;
                          text-align: center;
                          font-weight: bold;
                          font-size: large;
                        "
                      >
                        Caro(a) ${name}
                      </p>
                      <p style="text-align: left">
                        Este e-mail é para informarmos que seu cadastro a plataforma foi atualizado
                        sucesso com seu novo e-mail e senha para cadastro. Segue os novos dados atualizados abaixo.
                      </p>

                      <div style="margin: 1.5rem auto;">
                        <span style="text-align: left; margin-right: 1.5rem"
                          >E-mail: <strong>${email}</strong></span
                        >
                        <span style="text-align: right; margin-left: 1.5rem"
                          >Senha: <strong>${password}</strong></span
                        >
                      </div>

                      <p style="text-align: left">
                        Clique no botão abaixo para validar sua senha e acesso a plataforma.
                      </p>
                      <a href="${process.env.PLATFORM_URL}/firstAccess/${token}" id="button-dark">Acessar</a>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </body>
  </html>
  `;
};

export const FirstAcessEmail = (name) => {
  return `
  <!DOCTYPE html>
  <html lang="pt-BR">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        body {
          margin: 0;
          background-color: #ffff;
        }

        table {
          border-spacing: 0;
        }

        td {
          padding: 0;
        }

        .wrapper {
          display: table;
          table-layout: fixed;
          width: 100%;
          height: 100vh;
        }

        .main {
          margin: 0 auto;
          width: 100%;
          height: 100%;
          max-width: 600px;
          border-spacing: 0;
          font-family: sans-serif;
          color: #171a17;
        }

        a:link,
        #button-dark {
          display: block;
          background-color: #0094ff;
          color: #f0f3fa;
          text-decoration: none;
          padding: 12px 20px;
          border-radius: 5px;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <table class="main">
          <tr>
            <td style="padding: 0.5rem 2rem">
              <div
                style="
                  width: 100%;
                  background-color: #f0f3fa;
                  border: 1px solid transparent;
                  border-radius: 15px;
                  box-shadow: 12px 4px 6px #00000025;
                  padding: 1.5rem 3rem;
                "
              >
                <table>
                  <tr>
                    <td style="text-align: center; padding: 15px">
                      <p style="font-size: 20px; font-weight: bold">
                        Acesso a plataforma
                      </p>
                      <hr />

                      <p
                        style="
                          line-height: 23px;
                          padding: 5px 0 15px;
                          text-align: center;
                          font-weight: bold;
                          font-size: large;
                        "
                      >
                        Olá ${name}
                      </p>
                      <p style="text-align: left">
                        Sua senha de primeiro acesso a plataforma foi alterada com
                        sucesso para realizar seu login e ter acesso a plataforma.
                      </p>

                      <p style="text-align: left">
                        Clique no botão abaixo para ser redirecionado a
                        plataforma.
                      </p>
                      <a href="${process.env.PLATFORM_URL}/login" id="button-dark">Acessar</a>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </body>
  </html>
  `;
};
