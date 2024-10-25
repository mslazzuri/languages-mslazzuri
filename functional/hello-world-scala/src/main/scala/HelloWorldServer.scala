import akka.actor.typed.ActorSystem
import akka.actor.typed.scaladsl.Behaviors
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport._
import spray.json.DefaultJsonProtocol._
import spray.json.RootJsonFormat

import scala.io.StdIn

object HelloWorldServer {

  // Define a case class to model the JSON data
  case class StringList(strings: List[String])

  // Create the JSON format for the case class using Spray JSON
  // Explicitly defining the List[String] format
  implicit val listFormat: RootJsonFormat[StringList] = jsonFormat1(StringList)

  def main(args: Array[String]): Unit = {
    // Create an ActorSystem
    implicit val system = ActorSystem(Behaviors.empty, "helloWorldSystem")
    implicit val executionContext = system.executionContext

    // Define the route
    val route =
      path("greet" / Segment) { person =>
        get {
          complete(s"Hello, $person!")
        }
      } ~
      path("json") {
        post {
          entity(as[StringList]) { stringList =>
            // Handle the received JSON and print it
            println(s"Received JSON list: ${stringList.strings}")
            complete(s"Received JSON: ${stringList.strings.mkString(", ")}")
          }
        }
      } ~
      pathSingleSlash {
        get {
          complete(s"Hello!")
        }
      }

    // Start the server
    val bindingFuture = Http().newServerAt("localhost", 8080).bind(route)

    println("Server online at http://localhost:8080/\nPress 'q' to stop the server...")

    // Keep the server running until the user presses "q"
    var continueRunning = true
    while (continueRunning) {
      val input = StdIn.readLine()
      if (input == "q") {
        continueRunning = false
      }
    }

    // Unbind the server and terminate the system
    bindingFuture
      .flatMap(_.unbind()) // Unbind from the port
      .onComplete(_ => system.terminate()) // Terminate the system when done
  }
}
