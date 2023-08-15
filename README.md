# Bizzabo Home Assignment

Presented here is a boilerplate for monitoring a web application using Grafana and Prometheus.

# Installation
* Pull the repo `git pull https://github.com/Leekao/BizzaboAssignment.git`
* Inside `webApp` run `docker build . -t bizzabo-app .` (on some Docker versions this might be `docker buildx build . -t bizzabo-app`)


# Docker
* For a simple Docker example run `docker-compose up` from the project root folder
* Grafana: `http://localhost:3001/` (user/password: `admin`/`admin`, the Dashboard is under "General").
* Prometheus : `http://localhost:9090/`
* WebApp: `http://localhost:9999/`
* AlertManager: `http://localhost:9093/` 


# K8S (Local)
* In order to use k8s You'll need to change `k8s/grafana.yml` and fix the absolute path to fit your path, ABSOLUTE path only!
* Run `kubectl apply -f k8s` from the project root folder
* Access any of the services using the nodePorts (type `kubectl get services` for a list of the services, under `PORTS` you'll see the nodePort, the schema is `[internal port]:[node port]/TCP`)
* The Bizzabo web app is available on port 80 or on the node port of the nginx


# Alerts
This boilerplate supports a webhook alert, edit the file `alertmanager-cm.yml` and insert your discord/slack URL.
I used a requestbin url for testing and I advise you to do the same


# When Implementing For Production
* The mounts for Grafana needs to change from hostPath to a persistent volume claim
* The services and the nginx should be replaced by ingress controller and ingress (with TLS termination) or to ClusterIP
* The deployments have default resource limits or requirements, this needs to be fine-tuned before deploying to production
* The webApp is currently a single pods, this needs to be fine-tuned before deploying to production (change the value of `replicas`)
* Since on local mode the webApp is built on the host the image pull policy for the webApp deployment is `IfNotPresent`, when switching to production this will probably need to change and pull the image from a Docker repository.
* change the `webhook_url` on AlertManager to proper url
