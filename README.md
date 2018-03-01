# Cisco CMX Tool

Your virtual secretary!

## Base Essentials

To get this running, you will want to donwload the latest NodeJS version to your laptop:

(https://nodejs.org/en/download/current/)[https://nodejs.org/en/download/current/]

Run the installer and then go into your favorite shell

Once you have it installed, either clone or download a zip file of this repository.

```shell
cd Downloads/cisco-cmxtool #Or wherever you downloaded it to
npm install
```


## Running

Running the application is as simple as :

```shell
node index.js "bc:9f:ef:93:fb:83" "70:3e:ac:c4:93:75" "70:3e:ac:a1:e9:a9" "dc:ef:ca:fc:02:99" "b8:d7:af:19:21:95" "b8:d7:af:02:59:56"
```

Simply replace the mac addresses with your list of macs.  Be careful to order them properly as the order they are entered is the order they will be regurgitated.

Once it is all connected (and it should say when it connects to each mac address) simply press the return key each time you want to have it output the latest data

From there, you can copy all the output at once, and paste special into excel and you are off to the races.

Example Outout:

```shell

me@mylaptop:~/Sites/Addo/cisco-cmxtool$ node test.js "bc:9f:ef:93:fb:83" "70:3e:ac:c4:93:75" "70:3e:ac:a1:e9:a9" "dc:ef:ca:fc:02:99" "b8:d7:af:19:21:95" "b8:d7:af:02:59:56"
Client :: ready
Ready: bc:9f:ef:93:fb:83
Ready: 70:3e:ac:c4:93:75
Ready: 70:3e:ac:a1:e9:a9
Ready: dc:ef:ca:fc:02:99
Ready: b8:d7:af:19:21:95
Ready: b8:d7:af:02:59:56

bc:9f:ef:93:fb:83,70:3e:ac:c4:93:75,70:3e:ac:a1:e9:a9,dc:ef:ca:fc:02:99,b8:d7:af:19:21:95,b8:d7:af:02:59:56
-------,Press,|,Detecting,-------,Press,-------,Press,-------,Press,-------,Press  # << Note the ------ means it has not yet recieved a location for that device
127.21,107.61,130.38,110.82,128.79,107.6,130.0,108.91,-------,Press,128.82,110.78
127.21,107.61,130.38,110.82,128.79,107.6,130.0,108.91,-------,Press,128.82,110.78
128.02,108.0,129.6,110.79,128.8,107.2,130.0,108.91,-------,Press,128.82,110.78
128.0,108.0,129.6,110.37,129.2,107.2,130.0,108.86,134.0,108.79,128.81,110.39  # << Now it's really ready
127.59,108.0,129.61,109.57,129.2,107.2,130.0,108.86,134.0,108.76,128.81,110.39
128.0,108.4,130.4,108.39,128.4,107.6,130.0,108.86,134.0,108.76,128.81,110.39
128.0,108.4,130.4,108.39,128.4,107.6,130.0,108.86,134.0,108.76,128.81,110.39
128.0,108.4,130.4,108.41,127.98,107.6,130.0,108.86,134.0,108.76,128.81,110.39
127.2,108.0,129.61,111.19,122.75,108.02,130.0,109.24,134.0,108.76,128.78,110.38
127.21,108.0,130.0,110.38,119.04,109.41,130.0,109.24,134.0,108.76,128.78,110.38

```
