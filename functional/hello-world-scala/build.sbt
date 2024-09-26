// build.sbt
ThisBuild / scalaVersion := "2.13.12"

lazy val root = (project in file("."))
  .settings(
    name := "HelloWorldScalaApp",
    version := "0.1",
    scalaVersion := "2.13.12",
    libraryDependencies ++= Seq(
      "com.typesafe.akka" %% "akka-actor-typed" % "[2.6,3.0)",
      "com.typesafe.akka" %% "akka-http"        % "[10.2,11.0)",
      "com.typesafe.akka" %% "akka-stream"      % "[2.6,3.0)",
      "io.circe"          %% "circe-core"       % "0.14.1",
      "io.circe"          %% "circe-generic"    % "0.14.1",
      "io.circe"          %% "circe-parser"     % "0.14.1",
      "io.circe"          %% "circe-literal"    % "0.14.1"
    ),
    Compile / mainClass := Some("HelloWorldServer") // Explicitly setting main class
  )
