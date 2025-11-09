document.getElementById("calcular").addEventListener("click", () => {
  const demanda = document.getElementById("demanda").value.split(",").map(Number);
  const buses = document.getElementById("buses").value.split(",").map(Number);
  const costos = document.getElementById("costos").value.split(",").map(Number);

  if (demanda.length !== buses.length || demanda.length !== costos.length) {
    alert("Todas las listas deben tener la misma cantidad de valores");
    return;
  }

  // Lógica básica de asignación proporcional (similar a Gauss–Jordan)
  const totalDemanda = demanda.reduce((a, b) => a + b, 0);
  const totalBuses = buses.reduce((a, b) => a + b, 0);

  const asignacion = demanda.map((d, i) => {
    const proporcion = d / totalDemanda;
    const busesAsignados = Math.round(proporcion * totalBuses);
    const costoTotal = busesAsignados * costos[i];
    return { estacion: i + 1, demanda: d, buses: busesAsignados, costo: costoTotal };
  });

  let html = `
    <table>
      <tr><th>Estación</th><th>Demanda</th><th>Buses Asignados</th><th>Costo Total</th></tr>
      ${asignacion.map(a => `
        <tr>
          <td>${a.estacion}</td>
          <td>${a.demanda}</td>
          <td>${a.buses}</td>
          <td>${a.costo}</td>
        </tr>`).join("")}
    </table>
  `;

  const totalCosto = asignacion.reduce((a, b) => a + b.costo, 0);
  html += `<p><strong>Costo Total del Sistema:</strong> ${totalCosto}</p>`;

  document.getElementById("resultado").innerHTML = html;
});

