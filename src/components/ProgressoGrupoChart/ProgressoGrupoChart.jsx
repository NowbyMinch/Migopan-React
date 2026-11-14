import { PieChart, Pie, Cell, Tooltip } from "recharts";
import "./ProgressoGrupo.css";

const COR_CONCLUIDAS = "#3fd01f";
const COR_PENDENTES = "#e5384d";
const COR_VAZIO = "rgba(255, 255, 255, 0.08)";

export default function ProgressoGrupoChart({
  pendentes = 0,
  concluidas = 0,
  titulo = null,
  className = "",
}) {
  const total = pendentes + concluidas;
  const pct = total ? Math.round((concluidas / total) * 100) : 0;

  const dados =
    total === 0
      ? [{ nome: "Sem tarefas", valor: 1, cor: COR_VAZIO }]
      : [
          { nome: "Concluídas", valor: concluidas, cor: COR_CONCLUIDAS },
          { nome: "Pendentes", valor: pendentes, cor: COR_PENDENTES },
        ].filter((d) => d.valor > 0);

  return (
    <section className={`pg ${className}`}>
      {titulo && <h3 className="pg-titulo">{titulo}</h3>}

      <div className="pg-corpo">
        <div
          className="pg-grafico"
          role="img"
          aria-label={`${pct}% das tarefas concluídas: ${concluidas} de ${total}`}
        >
          <PieChart width={160} height={160}>
            <Pie
              data={dados}
              dataKey="valor"
              nameKey="nome"
              innerRadius={52}
              outerRadius={72}
              startAngle={90}
              endAngle={-270}
              paddingAngle={dados.length > 1 ? 3 : 0}
              cornerRadius={4}
              stroke="none"
              animationDuration={800}
            >
              {dados.map((d) => (
                <Cell key={d.nome} fill={d.cor} />
              ))}
            </Pie>

            {total > 0 && (
              <Tooltip
                contentStyle={{
                  background: "#1a1535",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                }}
                itemStyle={{ color: "#fff" }}
              />
            )}
          </PieChart>

          <div className="pg-centro">
            <strong>{pct}%</strong>
            <span>Tarefas concluídas</span>
          </div>
        </div>

        <ul className="pg-legenda">
          <li>
            <span className="pg-ponto pg-ponto--pendentes" />
            <span className="pg-nome">Pendentes</span>
            <strong>{pendentes}</strong>
          </li>
          <li>
            <span className="pg-ponto pg-ponto--concluidas" />
            <span className="pg-nome">Concluídas</span>
            <strong>{concluidas}</strong>
          </li>
          <li>
            <span className="pg-ponto pg-ponto--total" />
            <span className="pg-nome">Total</span>
            <strong>{total}</strong>
          </li>
        </ul>
      </div>
    </section>
  );
}
