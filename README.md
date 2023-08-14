Bizzabo Home Assignment

Presented here is a boilerplate for monitoring a web application using Grafana and Prometheus.

Installation

* git pull the repo
* inside `/webApp` run `docker build -t bizzabo-app .`
* from the root folder run `docker-compose up`

Endpoints

Grafana: `http://localhost:3001/` (user/password: `admin`/`admin`).
Prometheus : `http://localhost:9090/`
WebApp: `http://localhost:9999/`

Slack Notification
For the Slack notification to work you must supply a URL from slack to be the notification target, edit the file `/grafana/provisioning/notifiers.yml` and change `YOUR_SLACK_WEBHOOK_URL` to the actual URL.
