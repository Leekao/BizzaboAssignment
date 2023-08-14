# Bizzabo Home Assignment

Presented here is a boilerplate for monitoring a web application using Grafana and Prometheus.

# Installation

* git pull the repo
* inside `webApp` run `docker build . -t bizzabo-app .` (on Docker Desktop 4.22+ it's `docker buildx build . -t bizzabo-app`)

# Docker
* For the Docker example run `docker-compose up` from the project root folder
Grafana: `http://localhost:3001/` (user/password: `admin`/`admin`).
Prometheus : `http://localhost:9090/`
WebApp: `http://localhost:9999/`

# K8S (Local)
* In order to use k8s You'll need to change `k8s/grafana.yml` and fix the absolute path to fit yours
* After the path was fixed run `kubectl apply -f k8s` from the project root folder
* Access any of the services using the nodePorts (type `kubectl get services` for a list of the services, under `PORTS` you'll see the nodePort, the schema is `[internal port]:[node port]/TCP`)

# Slack Notification
For the Slack notification to work you must supply a URL from slack to be the notification target, edit the file `/grafana/provisioning/notifiers.yml` and change `YOUR_SLACK_WEBHOOK_URL` to the actual URL.

# When Implementing For Production
* The mounts for Grafana needs to change from hostPath to a persistent volume claim
* The services that are external need to change to load balancer or Ingress
