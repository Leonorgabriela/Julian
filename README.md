<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Optimización de Buses - Centro Memoria</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f7fa;
      margin: 0;
      padding: 20px;
    }
    h1 {
      text-align: center;
      color: #003366;
    }
    form {
      background-color: #fff;
      max-width: 400px;
      margin: 30px auto;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }
    label {
      display: block;
      margin-top: 10px;
      font-weight: bold;
    }
    input {
      width: 100%;
      padding: 8px;
      margin-top: 5px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }
    button {
      margin-top: 15px;
      width: 100%;
      background-color: #007bff;
      color: white;
      border: none;
      padding: 10px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
    }
    button:hover {
      background-color: #0056b3;
    }
    #resultado {
      background-color: #eaf3ff;
      border-radius: 10px;
      padding: 15px;
      margin: 20px auto;
      max-width: 400px;
      display: none;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }
  </style>
</head>
<body>
  <h1>Optimización de Buses - Centro Memoria</h1>
  
  <form id="formulario">
    <label for="totalBuses">Buses disponibles:</label>
    <input type="number" name="totalBuses" id="totalBuses" required>

    <label for="d0">Demanda K10:</label>
    <input type="number" name="d0" id="d0" required>

    <label for="d1">Demanda L10:</label>
    <input type="number" name="d1" id="d1" required>

    <label for="d2">Demanda J73:</label>
    <input type="number" name="d2" id="d2" required>

    <button type="submit">Calcular</button>
  </form>

  <div id="resultado"></div>

  <script>
    document.getElementById('formulario').addEventListener('submit', function(e) {
      e.preventDefault();

      const totalBuses = parseFloat(document.getElementById('totalBuses').value);
      const demandas = [
        parseFloat(document.getElementById('d0').value),
        parseFloat(document.getElementById('d1').value),
        parseFloat(document.getElementById('d2').value)
      ];

      const totalDemanda = demandas.reduce((a, b) => a + b, 0);
      const resultadoDiv = document.getElementById('resultado');

      if (totalDemanda === 0) {
        resultadoDiv.innerHTML = "<b>Error:</b> la demanda total no puede ser cero.";
        resultadoDiv.style.display = "block";
        return;
      }

      // Calcula la proporción de buses por ruta
      let resultado = "<h3>Distribución de Buses</h3>";
      for (let i = 0; i < demandas.length; i++) {
        const proporcion = demandas[i] / totalDemanda;
        const busesAsignados = Math.round(proporcion * totalBuses);
        resultado += `<p><b>Ruta ${['K10','L10','J73'][i]}:</b> ${busesAsignados} buses</p>`;
      }

      resultadoDiv.innerHTML = resultado;
      resultadoDiv.style.display = "block";
    });
  </script>
</body>
</html>
