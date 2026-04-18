import db from "../database";
import { api } from "./api";

// ✅ OK
export const syncUsuarios = async () => {
  try {
    const response = await api.get("/usuarios");
    const usuarios = response.data;

    db.runSync(`DELETE FROM USUARIOS`);

    usuarios.forEach((user) => {
      db.runSync(
        `INSERT INTO USUARIOS 
        (MATRICULA, NOME, CODUSUR, CODFILIAL, USUARIOBD, SENHA)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
          user.matricula,
          user.nome,
          user.codusur,
          user.codfilial,
          user.usuariobd,
          user.senha,
        ]
      );
    });

    return true;
  } catch (error) {
    console.log("ERRO NO SYNC:", error);
    throw error;
  }
};

// 🔥 CORRIGIDO
export const syncClientes = async (user) => {
  try {
    if (!user) {
      throw new Error("Usuário não informado");
    }

    const response = await api.get(
      `/clientesRca/${user.CODUSUR}/${user.CODFILIAL}`
    );

    const clientes = response.data;

    console.log("CLIENTES API:", clientes.length);

    db.runSync(`DELETE FROM CLIENTES`);

    clientes.forEach((cli) => {
      db.runSync(
        `INSERT INTO CLIENTES (
          CODCLI, CLIENTE, FANTASIA, BLOQUEIO, CODCLIPRINC,
          ENDERENT, BAIRROENT, MUNICENT, ESTENT,
          CODUSUR1, CODUSUR2, CODUSUR3,
          CODPRACA, PRACA,
          CODCOB, COBRANCA,
          CODPLPAG, PLANOPAG,
          CODREDE, NUMREGIAO, CODATIV, RAMO,
          CNPJ, LIMCRED, PEDABERTO, VLABERTO,
          SUPERV1, SUPERV2, SUPERV3,
          TELENT, TELCOB, TELCOM,
          EMAIL, EMAILNFE,
          PLPAGNEG, OBSENTREGA1,
          UTILIZAPEDCLINFE, CODFILIALNF,
          IEENT, CALCULAST, CONTRIBUINTE, CONSUMIDORFINAL
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          cli.codcli,
          cli.cliente,
          cli.fantasia,
          cli.bloqueio,
          cli.codcliprinc,

          cli.enderent,
          cli.bairroent,
          cli.municent,
          cli.estent,

          cli.codusur1,
          cli.codusur2,
          cli.codusur3,

          cli.codpraca,
          cli.praca,

          cli.codcob,
          cli.cobranca,

          cli.codplpag,
          cli.planopag,

          cli.codrede,
          cli.numregiao,
          cli.codatv,
          cli.ramo,

          cli.cnpj,
          Number(cli.limcred) || 0,
          Number(cli.pedaberto) || 0,
          Number(cli.vlaberto) || 0,

          cli.superv1,
          cli.superv2,
          cli.superv3,

          cli.telent,
          cli.telcob,
          cli.telcom,

          cli.email,
          cli.emailnfe,

          cli.plpagneg,
          cli.obsentrega1,

          cli.utilizapedclinfe,
          cli.codfilialnf,

          cli.ieent,
          cli.calculast,
          cli.contribuinte,
          cli.consumidorfinal,
        ]
      );
    });

    return true;
  } catch (error) {
    console.log("ERRO SYNC CLIENTES:", error);
    throw error;
  }
};