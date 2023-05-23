if [ ! -f ./.env ]; then
    echo 'you forgot create .env' && exit -1
fi

if [ ! -f ./inventory.cfg ]; then
    echo 'you forgot create inventory.cfg' && exit -1
fi

source .env

if [ -z "$WEB_DOMAIN" ]; then
    echo 'you forgot specify WEB_DOMAIN' && exit -1
fi

if [ -z "$WEB_PROXYPASS" ]; then
    echo 'you forgot specify WEB_PROXYPASS' && exit -1
fi

if [ -z "$CERTBOT_EMAIL" ]; then
    echo 'you forgot specify CERTBOT_EMAIL' && exit -1
fi

echo 'env vars:'
cat .env; echo "\n"

echo 'inventory:'
cat inventory.cfg; echo "\n"

echo 'bootstrap machine'
ansible-playbook bootstrap-machine.yml -i inventory.cfg; echo "\n"

echo 'deploying web config'
ansible-playbook deploy-nginx-conf.yml -i inventory.cfg -e "template=./templates/web.conf domain=$WEB_DOMAIN email=$CERTBOT_EMAIL proxypass=$WEB_PROXYPASS"

