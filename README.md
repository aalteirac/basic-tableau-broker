
# Basic-tableau-broker

A little sample showing a ticket broker designed to be hosted on Tableau Server (so the IP to trust is 127.0.0.1).
Can be useful in cloud env where all IP's are dynamic.
**This broker is NOT secured**
For a more robust version, try this one: [jwt-tableau-broker](https://github.com/aalteirac/jwt-tableau-broker)

## USAGE

Obtain  a ticket:

GET http://tabIP:2999/api/getTicket?username=TAB_USER_NAME


![ScreenShot](https://raw.githubusercontent.com/aalteirac/basic-tableau-broker/master/two.png)

### INSTALL
Run the nodejs server:
- Install nodejs runtime
- Download the entire repo in zip or git clone

In the project folder, run the following:
- npm install

Run it with:
- node index.js

The server is running on port 2999 by default
