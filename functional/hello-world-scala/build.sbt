// build.sbt

name := "HelloWorldScala"

version := "0.1"

scalaVersion := "2.13.10" // or the latest 2.13 version

libraryDependencies ++= Seq(
  "com.typesafe.akka" %% "akka-actor-typed" % "2.6.20",
  "com.typesafe.akka" %% "akka-http" % "10.2.10",
  "com.typesafe.akka" %% "akka-stream" % "2.6.20",
  "io.circe" %% "circe-core" % "0.14.5",
  "io.circe" %% "circe-generic" % "0.14.5",
  "io.circe" %% "circe-parser" % "0.14.5",
  "de.heikoseeberger" %% "akka-http-circe" % "1.41.3" // Updated to the latest version
)



