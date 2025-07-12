<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Employee Directory (Freemarker)</title>
  <link rel="stylesheet" href="/public/css/styles.css">
</head>
<body>
  <header>
    <h1>Employee Directory</h1>
  </header>
  <div class="container">
    <#list employees as emp>
      <div class="card">
        <div>
          <p><strong>${emp.firstName} ${emp.lastName}</strong></p>
          <p>${emp.email}</p>
          <p>${emp.department} - ${emp.role}</p>
        </div>
      </div>
    </#list>
  </div>
</body>
</html>
