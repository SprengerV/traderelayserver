#! /bin/bash

# Replace <PORT> with the port you set in .env
# Make sure to leave the "&" at the end so ngrok
# can run in the background
ngrok http <PORT> &
echo "NGROK started !"
echo "PID: $1"