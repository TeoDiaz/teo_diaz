#### ¿Qué pasa si se envía si la base de datos da un error?

*No podremos conservar la información de que ese mensaje ha sido enviado. 
Para solucionarlo podriamos reinterntar un número máximo de veces y si tras esos intentos no se consigue se puede almacenar en una variable/cache de nuestra aplicación a la espera de poder guardar esa información*

#### ¿Es igual de importante el error en el envío de un mensaje o en la consulta del registro?

*Me parece más importante el error al envío ya que se ven afectados muchos más servicios, como por ejemplo, el cliente que lo envia, la base de datos que recibe la información que no ha llegado y el destino que no recibe ese mensaje, son muchos errores que controlar.
Sin embargo cuando consultamos el registro puede ser por una mala consulta o por fallo en la base de datos, casos puntuales que pueden ser resueltos con una nueva petición hasta que esta este bien hecha o se restablezca la base de datos.*



