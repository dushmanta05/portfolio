---
title: 'SAML Authentication: SP vs. IdP Flows Explained'
description: |
  Learn about SAML authentication, its definitions, workings, and the differences between SP and IdP initiated flows in this comprehensive guide
publishDate: 2025-03-07 12:16:00
img: https://cdn.hashnode.com/res/hashnode/image/upload/v1741349301800/a5658d4c-c526-4894-929f-b542519d9ea1.png
# img_alt
tags:
  - authentication
  - saml
---

Most enterprises work with different services like Slack, Microsoft 365, Salesforce, and Google Workspace daily. So, have you ever wondered how these enterprises provide access to all these services in one dashboard for their employees? Or imagine you have an enterprise and want to give your employees access to these platforms.

Since these services are independent, they would typically require separate login credentials. However, managing different usernames and passwords for each service would be an overhead and not an efficient solution. Can you imagine handling 10 different login credentials if there are 10 different services? This not only creates unnecessary complexity but also becomes a bottleneck in productivity and security management.

This is where SAML comes into the picture. SAML authentication solves this overhead by enabling seamless access to multiple services with a single set of credentials (the credentials of their own organization / identity provider). In this article, let’s learn about SAML, how it works, and the important terms related to SAML authentication that you need to know.

## What is SAML?

SAML, or Security Assertion Markup Language, is an open standard based on XML (Extensible Markup Language) used for authentication and sharing identity data. SAML transmits authentication and identity data using an XML data structure over HTTP or SOAP methods. This data is exchanged between an organization’s **Identity Provider (IdP)** and a **Service Provider (SP)**—which we will discuss next.

### Identity Provider (IdP):

In SAML authentication, the **Identity Provider (IdP)** is the entity that provides identity information about the user who needs authentication. The IdP can be your organization itself, or if you're using a third-party service like Google or Okta, then it will act as the IdP.

### Service Provider (SP):

The **Service Provider (SP)** is the entity that offers services to the organization and its users. For example, Microsoft 365 and Google Workspace act as Service Providers for organizations integrating with them. Any platform that provides a service and support SAML authentication can be considered an SP.

For example, imagine you have an organization let’s say **Acme Inc.,** and you want to offer health benefits to employees through a health benefits provider let’s say **Healthy Inc.** Your employees need to log in to Healthy Inc.'s portal to access their benefits. If you establish SAML authentication, **Acme Inc.** acts as the **IdP**, providing identity data for employees, while **Healthy Inc.** acts as the **SP**, granting access based on that authentication.

## How SAML Works?

### Establishing Trust Between IdP and SP

SAML authentication occurs between an **Identity Provider (IdP)** and a **Service Provider (SP)**. Before the authentication process begins, both entities must establish a trust relationship. This is achieved by exchanging metadata, specifying endpoints, defining connection methods, and sharing signing and encryption certificates based on **Public Key Infrastructure (PKI)**.

Let’s explore some key terms required for trust establishment.

#### ACS URL (Assertion Consumer Service URL):

The **ACS URL** is provided by the **Service Provider (SP)** and serves as the endpoint where users are redirected to complete authentication and access the service. Typically, SAML authentication requests to this endpoint are made via a **POST request**.

#### IdP Single-Sign On (SSO) / Login URL:

The **IdP SSO/Login URL** is provided by the **Identity Provider (IdP)** to the **Service Provider (SP)** and serves as the endpoint that receives the **SAML authentication request** from the **SP**. This URL is where users are redirected when they attempt to log in via SAML authentication to the **SP** using **ACS URL**, allowing the **SP** to obtain authentication data from the **IdP**.

#### Audience URI / Entity ID:

The **Audience URI** is provided by the **SP** to the **IdP** and serves as a unique identifier representing the **SP**. This **URI** indicates who the assertion is intended for, and it is validated by the **Service Provider**. Typically, the **Audience URI** is included in the SAML response data.

#### Relay State:

The **Relay State** is a parameter provided by the **SP** to the **IdP**. It is a URL or identifier used to maintain the user's state. The Relay State determines where to redirect the user after successful SAML authentication. Since the SP doesn't know the user's state before the SAML authentication login, the Relay State holds a value that guides where the user is redirected after successful authentication. In most cases, the Relay State is a URL where the user will be redirected.

#### Public-Private Key Pair:

A **public-private key pair** (Public Key Infrastructure) is used to secure the SAML authentication process through encryption and signature.

- Both the **IdP** and **SP** generate their own **public-private key pairs** and share their public keys with each other.

- These keys are used to sign the requests and responses with private keys, and they can be verified using the shared public keys. This ensures that the requests or responses are legitimate and have not been tampered with.

These above configuration are used to establish trust between the **IdP** and **SP**.

### SAML Authentication Flow

Next, let’s explore how **SAML authentication** works.

1. **User Request Access**
   The user tries to access a service (**SP**) like **Healthy Inc.**

2. **SP Redirects User to IdP SSO URL**

   The **SP** generates a **SAML Authentication Request** and redirects the user to the **IdP SSO Login URL**.

3. **User Authenticates with IdP**
   The user logs into the **Identity Provider (IdP)** (**Acme Inc.** in this example).

4. **IdP Generates SAML Response**
   Upon successful authentication, the **IdP** creates a **SAML Response**, including a **SAML Assertion** (more about **SAML Response** and **Assertion** are discussed below) containing the user’s identity data. Then the response is digitally **signed with the IdP’s private key** to ensure authenticity.

5. **IdP Sends Response to SP**
   The **IdP** redirects the user back to the **SP’s ACS (Assertion Consumer Service) URL** with the **SAML Response**, including the **Relay State**, via an **HTTP POST request**.

6. **SP Validates the SAML Response**
   The **SP**:

   - Verifies the **digital signature** using the IdP’s **public key** (which was provided during trust establishment).

   - Ensures that the response is valid and hasn’t been tampered with.

7. **Redirects to Relay State**
   After successful verification, the **SP** redirects the user to the **Relay State URL** (provided in the initial request). This ensures the user lands on the correct page after authentication.

Here’s an image illustrating SAML authentication flow:

![SAML Authentication Flow](https://cdn.hashnode.com/res/hashnode/image/upload/v1741349403971/7c99e184-fd60-495e-9952-296b6291f1ef.png)

### SAML Response and Assertion

#### What is a SAML Response?

A **SAML Response** is an **XML-based authentication message** sent by the **Identity Provider (IdP) to the Service Provider (SP)**. It contains the **SAML Assertion**, which holds user identity data, attributes, and other important information such as the **signature, issuer, destination, and timestamp**.

#### What is a SAML Assertion?

A **SAML Assertion** is the **core part of the SAML Response,** as it carries the user’s identity information to the **SP**. The SP uses this assertion to **create a login session** and **grant access** to the requested service.

#### SAML Signature

Before sending the **SAML Response**, the IdP **signs it using its private key**. The response includes:

- **Digest value** (ensuring data integrity)

- **Signature value** (confirming authenticity)

- **X.509 certificate** (used for validation)

Additionally, the **SAML Assertion itself can also be signed** with the same key. This means:

- Both the **SAML Response** and the **SAML Assertion** can be signed separately.

- The **digest value, signature, and X.509 certificate** are included in both if needed.

For **better security**, it is recommended to **sign both the SAML Assertion and the SAML Response** to prevent tampering.

#### Structure of SAML Response

A typical SAML response contains the following data:

1. Issuer → Identifies which **IdP issued the SAML Response**.

2. Status → Indicates whether the authentication **succeeded or failed**.

3. Assertions → Contains **authentication, attribute, and assertion authorization details**.

4. Signature & Encryption → Contains the signature data for the whole SAML response.

### SP-Initiated vs. IdP-Initiated Flow

Now that we understand how SAML works, it's important to know that there are **two types of authentication flows** in which SAML can be implemented:

1. **SP-Initiated Flow** → The user starts at the **Service Provider (SP)**.

2. **IdP-Initiated Flow** → The user starts at the **Identity Provider (IdP)**.

#### SP-Initiated Flow:

The **SP-Initiated Flow** is the **most commonly used** SAML authentication flow. The SAML authentication process we discussed earlier follows this flow, where the **user starts from the Service Provider's login page**.

How it works:

1. The user tries to log in from the **SP (e.g., Healthy login page)**.

2. The **SP redirects the user** to the **IdP’s SSO Login URL**, sending a **SAML Authentication Request**.

3. The **IdP authenticates the user**.

4. The **IdP generates a SAML Response** and **sends it back to the SP** (via ACS URL).

5. The **SP validates the response** and logs the user in.

**Note:** In an **SP-Initiated Flow**, the **authentication request starts from the SP**, and the **SAML Authentication Request is sent from the SP to the IdP**.

Here’s an image illustrating the SP-Initiated SAML authentication flow:

![SP-Initiated SAML Authentication Flow](https://cdn.hashnode.com/res/hashnode/image/upload/v1741349469357/54789fc2-283b-4ce2-b8f1-a3574f473b06.png)

#### IdP-Initiated Flow:

The **IdP-Initiated Flow** is **less common** but is often used in **enterprise dashboards**, where employees **log in once** and access multiple services from a **single portal** (Single Sign-On).

1. The **user logs in directly at the IdP** (e.g., a corporate dashboard).

2. When the user wants to access a specific service, the **IdP generates a SAML Response** and sends it **directly to the SP** (without a request).

3. The **SP validates the response** and logs the **user in**.

**Note:** In an **IdP-Initiated Flow**, there is **no authentication request sent from the SP**. The **IdP directly initiates the authentication process** and sends the **SAML Response to the SP**.

Here’s an image illustrating the IdP-Initiated SAML authentication flow:

![IdP-Initiated SAML Authentication Flow](https://cdn.hashnode.com/res/hashnode/image/upload/v1741349512482/3bb4fb03-2569-4c66-b454-98909feea11b.png)

## Benefits of SAML Auth

Here are some key benefits of using SAML authentication:

- Eliminates the need for multiple passwords, reducing the risk of phishing and credential theft.

- Users only need to log in once to access multiple service providers, reducing password fatigue.

- Users don’t have to remember multiple credentials, leading to faster and smoother access.

- Enterprises can use their own IdP to manage authentication securely across various platforms.

- Service providers don’t need to store or manage user credentials in their database, reducing security risks and compliance overhead.

## How SAML is Different from Oauth?

Now that we've learned about SAML, you might wonder how it differs from OAuth and whether OAuth can be used for login to multiple service providers instead.

Both **SAML** and **OAuth** are open standards, but they serve different purposes:

- **SAML** is primarily used for **authentication**, verifying a user’s identity.

- **OAuth** is used for **authorization**, granting access to resources without exposing login credentials.

**Example**: Let’s say you want to log in to multiple services—**Microsoft 365, Slack, and Salesforce**—using **OAuth with Google** instead of SAML. Here’s what happens:

1. You visit **Microsoft 365** and choose to log in with Google.

2. Google redirects you to an **OAuth consent page** asking for permission.

3. Once you grant permission, **Microsoft 365** receives an **OAuth access token** and logs you in.

Now, if you want to log in to more service providers, you have to **repeat the same process** for each provider separately. Not to mention, your **IdP must be Google** since you’re using Google OAuth. This becomes difficult for enterprises that have their **own Identity Provider (IdP).**

Now, if we use **SAML instead**,

- We can **integrate multiple service providers** with a single **enterprise IdP**.

- Users can **log in once** and seamlessly access all service providers from **one dashboard** through SAML authentication.

## Conclusion

As we learned above, SAML authentication is a secure way to access multiple independent services. It helps enterprises provide access to multiple services from their IdP. It enables seamless SSO, reduces security risks, and simplifies identity management. It’s also worth mentioning that SAML is not limited to enterprises—it can be used by any organization or system that requires secure and efficient authentication across multiple service providers.

---

I hope this article helped you understand the key concepts of SAML, its different authentication flows, and its benefits. Please feel free to comment if you have any doubts or reach out to me. Also, let me know if I’ve made any mistakes in the article—I’d love to learn and improve! Happy coding :)
