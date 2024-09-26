// src/main/scala/HelloWorldServer.scala

import akka.actor.typed.ActorSystem
import akka.actor.typed.scaladsl.Behaviors
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import akka.http.scaladsl.model.StatusCodes
import akka.http.scaladsl.model.HttpEntity
import akka.http.scaladsl.model.ContentTypes

import io.circe.generic.auto._ // Automatic derivation of encoders/decoders
import io.circe.syntax._       // For converting Scala objects to JSON
import io.circe.parser.decode  // For parsing JSON

import scala.io.StdIn

// Define the case class for JSON input and output
case class StringList(strings: List[String])

object HelloWorldServer {

  def main(args: Array[String]): Unit = {
    // Create an ActorSystem
    implicit val system = ActorSystem(Behaviors.empty, "helloWorldSystem")
    implicit val executionContext = system.executionContext

    // Define the routes
    val route: Route = concat(
      path("greet" / Segment) { person =>
        get {
          complete(s"Hello, $person!")
        }
      },
      path("sort-strings") {
        post {
          entity(as[String]) { jsonString =>
            decode[StringList](jsonString) match {
              case Right(stringList) =>
                val sortedStrings = stringList.strings.sorted // Functional sorting
                complete(HttpEntity(ContentTypes.`application/json`, StringList(sortedStrings).asJson.noSpaces))
              case Left(error) =>
                complete(StatusCodes.BadRequest, s"Invalid JSON: $error")
            }
          }
        }
      }
    )

    // Start the server
    val bindingFuture = Http().newServerAt("localhost", 8080).bind(route)

    println("Server online at http://localhost:8080/\nPress RETURN to stop...")
    StdIn.readLine() // Keep the server running until user presses return
    bindingFuture
      .flatMap(_.unbind()) // Unbind from the port
      .onComplete(_ => system.terminate()) // Terminate the system when done
  }
}
