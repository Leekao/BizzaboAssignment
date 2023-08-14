Bizzabo Home Assignment

Presented here is a boilerplate for monitoring a web application using Grafana and Prometheus.

Installation

* git pull the repo
* inside `/webApp` run `docker build . -t bizzabo-app .` (on Docker Desktop 4.22+ it's `docker buildx build . -t bizzabo-app`)
* For the Docker example run `docker-compose up` from the project root folder

Docker Endpoints
Grafana: `http://localhost:3001/` (user/password: `admin`/`admin`).
Prometheus : `http://localhost:9090/`
WebApp: `http://localhost:9999/`

* In order to use the k8s You'll need to change `k8s/grafana.yml` and fix the absolute path
* After the path was fixed run `kubectl apply -f k8s` from the project root folder

Slack Notification
For the Slack notification to work you must supply a URL from slack to be the notification target, edit the file `/grafana/provisioning/notifiers.yml` and change `YOUR_SLACK_WEBHOOK_URL` to the actual URL.
