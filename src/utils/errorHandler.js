export async function getErrorMessage(response) {
  try {
    const errorData = await response.json();
    console.log("Erro retornado pelo backend:", errorData);

    // 1. Tratamento para validação de campos do Spring Boot (@Valid)
    // Suporta 'fieldErrors' ou a lista 'errors' padrão do Spring
    const fields = errorData.fieldErrors || errorData.errors;
    if (Array.isArray(fields) && fields.length > 0) {
      return fields
        .map((err) => {
          const campo = err.field ? `${err.field}: ` : "";
          const mensagem = err.message || err.defaultMessage || "inválido";
          return `${campo}${mensagem}`;
        })
        .join(" | ");
    }

    // 2. Mensagens diretas da API (Custom Exception Handler / Spring ResponseStatusException)
    if (errorData.message) {
      return errorData.message;
    }

    if (errorData.error) {
      return `Erro: ${errorData.error}`;
    }
  } catch (e) {
    console.warn("Não foi possível converter o corpo da resposta em JSON", e);
  }

  // Fallback genérico caso a API retorne corpo vazio ou não-JSON
  return `Erro na requisição (Código ${response.status})`;
}