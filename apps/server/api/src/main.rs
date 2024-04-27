use axum::{response::Html, routing::get, Router};

#[tokio::main]
async fn main() {
    let router = Router::new().route("/", get(|| async { Html("<p>hello world</p>") }));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:8080").await.unwrap();
    axum::serve(listener, router).await.unwrap();
}
