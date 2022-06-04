echo "reading file....."
awk -F = '{print "NEXT_PUBLIC_FIREBASE_"$1"="$2}' environment > .env.local
chmod +x .env.local
rm environment
echo "enviroment setup done....."