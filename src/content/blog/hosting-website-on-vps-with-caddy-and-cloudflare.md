---
title: Host Your Website with VPS, Caddy & Cloudflare
description: |
  Learn how to host your website on a VPS using Caddy Server and Cloudflare with this step-by-step guide
publishDate: 2024-11-11 22:39:07
img: https://cdn.hashnode.com/res/hashnode/image/upload/v1731364644904/188b7635-5e25-4da3-97ed-b12af73c9cd3.png
# img_alt
tags:
  - cloudflare
  - digitalocean
  - vps-hosting
---

Hosting your frontend application on **Vercel** or **Netlify** is quite simple; you just need to provide access to your repository and the build command. Recently, I moved my personal portfolio from _Next.js_ to _Astro_ because my portfolio has more static content. My previous _Next.js_ site was deployed on both **Vercel** and **Netlify**, so it was easy to deploy by just changing the build command. However, since I recently bought a **Virtual Private Server** **(VPS)** from **Digital Ocean (Droplet)**, I decided to host my portfolio there and serve it through **Cloudflare**.

In this article, we'll explore how I achieved this using my **VPS**, **Caddy server**, and **Cloudflare**, and how you can do it too by following the steps. But first, let's briefly understand what the [Caddy server](https://caddyserver.com) and [Cloudflare](https://cloudflare.com) are.

#### Cloudflare:

You might already know about _Cloudflare_, a well-known company that offers services to enhance website performance and security. I'm using Cloudflare's _reverse proxy_ service, which is nearly free. You might wonder, what is a reverse proxy? Simply put, a reverse proxy is a server that sits between my VPS and the user. It acts as a protective layer between my website and the public, helping to hide my server's IP address and prevent certain types of malware and cyber attacks.

#### Caddy server:

_Caddy server_ is a free and open-source web server written in _Golang_. You might have heard of _Apache_ or _Nginx_ web servers, right? Caddy is similar to those, but it is secure by default. Caddy automatically gets and renews TLS certificates, making secure HTTPS connections easy.

**P.S.** I should mention that I already have my domain and a _Cloudflare_ account. I also purchased a _VPS_ from _DigitalOcean_ with a _Debian_ setup. This article won't cover these setups.

### Adding VPS IP to Cloudflare

First, go to your [Cloudflare dashboard](https://dash.cloudflare.com) and, in the Website section, add the domain name you want to host on your VPS. I've already added mine, and it should look something like this:

![Cloudflare Dashboard](https://cdn.hashnode.com/res/hashnode/image/upload/v1730954884053/f8b7aa18-a7e7-46e1-9ab5-8915e45acffb.png)

First, let's set up our SSL/TLS encryption. On the Cloudflare dashboard, click on the domain name you added (for example, _dushmanta.dev_ in my case). This will open the domain overview page and settings, which should look like this:

![Domain Overview](https://cdn.hashnode.com/res/hashnode/image/upload/v1731006257330/b4810ff3-8e87-4ac9-89c5-2d5bdc434824.png)

#### Set SSL/TLS encryption mode:

On the domain settings page, go to the _SSL/TLS_ section (refer to the image above). It should look like this:

![SSL Settings](https://cdn.hashnode.com/res/hashnode/image/upload/v1731031885410/769e7383-f85d-48fc-bc5b-29910c0d3047.png)

From the _SSL/TLS_ overview page, go to the configuration settings. It should look something like this:

![SSL Overview Page](https://cdn.hashnode.com/res/hashnode/image/upload/v1731032103598/3a334d98-46bb-4e03-bcb0-379af13574eb.png)

In this section, set the custom _SSL/TLS_ to "Full (Strict)" and save it.

![Custom SSL/TLS Setting](https://cdn.hashnode.com/res/hashnode/image/upload/v1731032206411/62c821b5-847a-44cb-8d4c-50cb221fe4ae.png)

The reason to choose "Full (Strict)" is to ensure the request connection is encrypted from end to end. This means when someone visits your domain, the request goes to Cloudflare, and then Cloudflare serves the content by connecting to your VPS. The flow looks like this:

User → Cloudflare: HTTPS
Cloudflare → Your VPS: HTTPS with a validated certificate
VPS → Cloudflare
Cloudflare → User (HTTPS)

#### Get Your Droplet (VPS) Ipv4

Now, let's get the IP of the VPS from the [DigitalOcean dashboard](https://cloud.digitalocean.com/). The dashboard should look like this, and you need to copy your IPv4 address.

![DigitalOcean Dashboard](https://cdn.hashnode.com/res/hashnode/image/upload/v1731005945225/61882225-1d7c-47e7-b3e9-3b7decae2000.png)

#### Add “A” records to Cloudflare DNS

On the domain settings page, go to the _DNS_ section.

![Domain Settings](https://cdn.hashnode.com/res/hashnode/image/upload/v1731059870680/18bdacf5-d349-4dcb-ae81-f8b763569647.png)

Now, if you have used Cloudflare for your website before, you might have some **"A"**, **"AAAA"**, **"CNAME"**, and **"TXT"** records. In my case, since I deployed my site with Netlify, my DNS records from Netlify looked something like this:

![DNS Records](https://cdn.hashnode.com/res/hashnode/image/upload/v1731061322869/ef23bbad-d3aa-4960-a329-b580911fcc21.png)

Before adding our VPS server's IP, we need to delete all the **"A"**, **"AAAA"**, and **"CNAME"** records (only for the root domain) if they exist. After removing them, we need to add **"A"** and **"CNAME"** DNS records pointing to the VPS IP address.

- "A" record: Name → @, VPS IPv4 address, Proxy status → on

- "CNAME" record: Name → WWW, Target → Original domain name, Proxy status → on

When adding a new DNS record, set the type to **"A"**. In the Name section, add **@**, which represents your website (in my case, it’s dushmanta.dev), and ensure the _proxy status_ is turned _on_. Then save it. It should look like this.

![DNS Records](https://cdn.hashnode.com/res/hashnode/image/upload/v1731063788371/c341f4d7-987d-4166-953c-d48542bbff8f.png)

Next, add a **"CNAME"** record named **"WWW"** to create an alias. This way, if someone accesses the website using *www.dushmanta.dev*, it will redirect to the main website. Set your website as the target and ensure the proxy status is turned on. It should look like this.

![DNS Record Alias](https://cdn.hashnode.com/res/hashnode/image/upload/v1731064827909/5319db89-8dcc-48a8-8416-f426c3ffbeab.png)

Now that our Cloudflare DNS is set up, let's move on to build the portfolio from the repository and configuring Caddy on our VPS to manage the requests.

### Build the Portfolio on VPS

Create a clone of your repository from GitHub, GitLab, or wherever your portfolio code is hosted onto your VPS, if you haven’t already. Next, run a build of your portfolio using the required command to generate the output in the dist folder, if you’re using a framework. If you're using vanilla JavaScript with HTML and CSS, simply place your HTML, CSS, and JS files in the dist folder. Now, the build output will be in the dist folder.

Now we can serve the build files from this repo, but for better organization, I recommend creating a separate folder for the build files. This way, if we want to host more websites on our VPS in the future, it will be easier to manage.

#### Create a Directory

On your VPS, create a directory for your site with the following command. (Since I’m hosting my portfolio, I will name the directory "portfolio.")

```bash
sudo mkdir -p /var/www/your-site
# sudo mkdir -p /var/www/portfolio
```

#### Copy dist Folder

Next, copy the build files from the repository to the dedicated directory using the following command:

```bash
sudo cp -r dist/* /var/www/your-site/
# sudo cp -r dist/* /var/www/portfolio/
```

### Install and Set Up Caddy Server

Install the **Caddy** server on your VPS according to your distribution by following the [installation docs](https://caddyserver.com/docs/install). There are two releases: a stable release and a testing release. It is recommended to use the stable release to avoid any issues. My server is _Debian_, so I will install the `apt` package.

```bash
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy
```

#### Set Proper Permission

Next, give **Caddy** the correct permissions for the folder where the build files are located using the following command:

```bash
sudo chown -R caddy:caddy /var/www/your-site
# sudo chown -R caddy:caddy /var/www/portfolio
```

#### Setting Up Caddy Service Configuration

Now, let's verify or create the `systemd` Caddy service configuration. This setup ensures that the systemd service file automatically manages Caddy's lifecycle, which includes automatic starts, restarts, and proper resource management on the server.

Open the service file with the following command (this command will create the file if it doesn't exist):

```bash
sudo nano /etc/systemd/system/caddy.service
```

The service file should look something like this:

```bash
[Unit]
Description=Caddy web server
Documentation=https://caddyserver.com/docs/
After=network.target network-online.target
Requires=network-online.target

[Service]
Type=notify
ExecStart=/usr/bin/caddy run --config /etc/caddy/Caddyfile
TimeoutStopSec=5s
LimitNOFILE=1048576

[Install]
WantedBy=multi-user.target
```

If it's empty, update the file with the contents provided above and be sure to save it.

##### Notes:

- This configuration makes sure Caddy starts automatically with your system.

- It waits for network connectivity before starting.

- The service is set up to handle high loads with `LimitNOFILE`.

After saving the configuration, make sure to follow the next steps:

##### Reload systemd daemon:

```bash
sudo systemctl daemon-reload
```

##### Start Caddy service:

```bash
sudo systemctl start caddy
```

##### Check status:

```bash
sudo systemctl status caddy
```

##### Enable auto-start:

```bash
sudo systemctl enable caddy
```

#### Configure the Caddyfile

After setting the correct permissions and configuring the `systemd` Caddy service file, let's set up the **Caddyfile**. This is where we configure our domain settings and file serving options. To learn more about the **Caddyfile**, check out the [official documentation](https://caddyserver.com/docs/caddyfile-tutorial).

To edit the **Caddyfile**, run the following command:

```bash
sudo nano /etc/caddy/Caddyfile
```

##### Basic Configuration Structure:

1. Domain names (both root and www)

2. TLS configuration for Cloudflare SSL

3. Root directory path (your build folder)

4. File server directive (helps serve web pages from the directory mentioned above)

Here's how the _Caddyfile_ should look:

```bash
example.com, www.example.com {
    # TLS configuration for Cloudflare
    tls {
        protocols tls1.2 tls1.3
    }

    root * /var/www/site-name # the build folder
    file_server # File server directive
}
```

##### Example Implementation:

For my website, the _Caddyfile_ looks like this:

```bash
dushmanta.dev, www.dushmanta.dev {
    tls {
        protocols tls1.2 tls1.3
    }
    root * /var/www/portfolio
    file_server
}
```

Save the configuration file and then restart the _Caddy service_ with the following command:

```bash
sudo systemctl restart caddy
```

And voilà! You've set up your Caddy server on your VPS, and it's ready to be served through Cloudflare.

### Testing Your Configuration

Now, test if it works by using curl for both DNS records.

```bash
curl -v https://example.com
curl -v https://www.example.com
# Example
# curl -v https://dushmanta.dev
# curl -v https://www.dushmanta.dev
```

If you find any errors, make sure to configure your _Caddy service_ and _Caddyfile_ correctly, and check that your DNS settings are correct in your Cloudflare dashboard.

---

I hope this article helps if you're trying to host your website on your personal VPS with Caddy server and Cloudflare. Please let me know if you find any mistakes or have suggestions for improvement. Thank you, and happy coding! :)
