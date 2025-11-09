document.getElementById("calcular").addEventListener("click", () => {
  const total = parseFloat(document.getElementById("total").value);
  const demandas = [
    parseFloat(document.getElementById("demanda0").value),
    parseFloat(document.getElementById("demanda1").value),
    parseFloat(document.getElementById("demanda2").value)
  ];

  if (isNaN(total) || demandas.some(isNaN)) {
    alert("Por favor ingresa todos los valores numéricos correctamente.");
    return;
  }

  // --- Construcción de matrices ---
  const A = [
    [0, 0, 0],
    [0, 0, 0],
    [1, 1, 1]
  ];
  const B = [0, 0, total];

  A[0][0] = demandas[2]; A[0][2] = -demandas[0];
  A[1][1] = demandas[2]; A[1][2] = -demandas[1];

  const x = gaussJordan(A, B);
  mostrarResultado(x, ["K10", "L10", "J73"]);
});

// --- Método Gauss-Jordan ---
function gaussJordan(A, B) {
  const n = A.length;
  const M = A.map((fila, i) => [...fila, B[i]]);

  for (let p = 0; p < n; p++) {
    let fila = p;
    for (let i = p + 1; i < n; i++) {
      if (Math.abs(M[i][p]) > Math.abs(M[fila][p])) fila = i;
    }
    [M[p], M[fila]] = [M[fila], M[p]];
    const pivote = M[p][p];
    if (Math.abs(pivote) < 1e-12) continue;
    for (let j = p; j <= n; j++) M[p][j] /= pivote;
    for (let i = 0; i < n; i++) {
      if (i !== p) {
        const f = M[i][p];
        for (let j = p; j <= n; j++) M[i][j] -= f * M[p][j];
      }
    }
  }

  return M.map(f => f[n]);
}

function mostrarResultado(x, rutas) {
  const resultado = document.getElementById("resultado");
  let totalBuses = 0;
  let html = "<h2>🚌 Asignación:</h2><ul>";
  for (let i = 0; i < rutas.length; i++) {
    const val = Math.round(x[i]);
    totalBuses += val;
    html += `<li>${rutas[i]}: <strong>${val}</strong> buses</li>`;
  }
  const tiempo = Math.max(5, 60 - 2 * totalBuses);
  html += `</ul><p>⏱️ Tiempo estimado: <strong>${tiempo} min</strong></p>`;
  resultado.innerHTML = html;
}
