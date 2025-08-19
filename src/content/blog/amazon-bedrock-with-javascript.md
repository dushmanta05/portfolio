---
title: 'Amazon Bedrock with JavaScript'
description: |
  Learn how to use Amazon Bedrock in JavaScript via SDK and REST for text, chat, streaming, and structured outputs.
publishDate: 2025-08-07 01:28:00
img: https://cdn.hashnode.com/res/hashnode/image/upload/v1754510173292/3d737f18-c411-4264-9ad6-4add600bd2a7.png
# img_alt
tags:
  - amazon-bedrock
  - ai
---

As AI becomes more prevalent, integrating **Generative AI** into applications has become a common trend. Whether it's necessary and solves any problem is another matter.

Different service providers have their own LLMs, while some offer a variety of foundational models in one place with a single API key. _Amazon Bedrock_ is one of these providers. In this article, we’ll explore how to integrate _Amazon Bedrock_ into our JavaScript application. Before we begin, I want to thank [**Péter Harang**](https://medium.com/@harangpeter) for his article on [**Setting up AWS Bedrock for API-based text inference**](https://medium.com/@harangpeter/setting-up-aws-bedrock-for-api-based-text-inference-dc25ab2b216b), which has been very helpful for this implementation.

First, let's understand what **Amazon Bedrock** is.

## What is Amazon Bedrock?

_Amazon Bedrock_ is a fully managed service from AWS that lets you access various foundation models from top providers in one place. This makes it easier to integrate Generative AI into applications. It also allows you to customize with your own dataset for fine-tuning and to build RAG applications and agents. You can learn more about Amazon Bedrock [here](https://aws.amazon.com/bedrock/).

## Prerequisite:

To integrate this, you need to have an AWS account. Setting up an AWS account is quite simple, so I won't cover that in this article. Let's get started.

In this article, we’ll explore two ways to integrate Bedrock into our application: using the SDK and the REST API provided by Bedrock. Before we start the integration, let's first obtain the Bedrock token.

## AWS Bedrock Token:

Visit the _Amazon Bedrock_ page and click on the **Get started with Amazon Bedrock** link. Log in with your existing account or create a new one. If you're not redirected after logging in, search for Bedrock on the AWS Console page and visit the service page.

In the left menu, select `API keys` under `Discover` (Discover→API keys). You'll find two options there: short-term and long-term keys. Generate one based on your needs.

> Copy and save the API Key in a safe place, as you won't be able to copy it again unless you generate a new one.

## Configuring Model:

Now that we have our API key, we need to set up the model we’re going to use.

> Note: You will be charged based on the number of requests you make to each model. Each model has a different price for each API call. Check out the pricing for each model [here](https://aws.amazon.com/bedrock/pricing/).

In this implementation, we’ll use Amazon's own models, which are very low cost.

First, let’s see a simple text response with user input using Amazon’s `Titan Text G1 Lite` model. To configure a model, go to `model access` under `configure and learn` in the left catalog. Now you can see the different models available.

It’s important to note that these models are specific to the AWS region you’ve selected. You can see your AWS region in the top right corner. Not all models are available in all regions, and the AWS region is also important for integration.

To access any of the models, click on `Available request`. The availability can happen within seconds or sometimes takes 2–3 minutes. We’ll request the `Titan Text G1 Lite` for the `us-east-1 (N. Virginia US)` region.

> You can also learn more about the model on the model catalog (Discover → model catalog) page.

After the model request is approved, go to the model catalog and search for the model we requested. On the detail page, you’ll see the model ID. Copy and save it, as it’s needed to access the model.

Now that we have the API key, AWS region, and model ID, let’s integrate Amazon Bedrock.

## AWS SDK Method:

First, we'll implement the SDK method.

Install the package

```bash
npm i @aws-sdk/client-bedrock-runtime
```

Set the following values in your `env` file:

```bash
# AWS Configuration
AWS_REGION=
AWS_BEDROCK_MODEL=
AWS_BEARER_TOKEN_BEDROCK=
```

Copy the name exactly as it is, especially the `AWS_BEARER_TOKEN_BEDROCK` value, because the npm package will automatically read this value from an environment variable with that name, so we don't need to configure it manually.

### Generating Text Response:

First, create a client with the **AWS region** using the `BedrockRuntimeClient`.

```javascript
import { BedrockRuntimeClient } from '@aws-sdk/client-bedrock-runtime';

const { AWS_REGION: awsRegion, AWS_BEDROCK_MODEL: modelId } = process.env;

const client = new BedrockRuntimeClient({
  region: awsRegion,
});
```

Then, using the `ConverseCommand`, we'll create a command that includes the user's message, the model ID of the model we want to use, and inference settings to control the outputs.

```javascript
import { BedrockRuntimeClient, ConverseCommand } from '@aws-sdk/client-bedrock-runtime';

const inferenceConfig = {
  maxTokens: 4096,
  temperature: 0.5,
  topP: 0.9,
};

const conversation = [
  {
    role: 'user',
    content: [
      {
        text: 'Tell me about Max Verstappen.',
      },
    ],
  },
];

const command = new ConverseCommand({
  modelId,
  messages: conversation,
  inferenceConfig,
});
```

As you can see, the user message is formatted by specifying the role and including the prompt in the content. The role is especially useful for multi-turn chat, which we’ll discuss later in the article.

Next, we’ll use the client we set up earlier to execute the command.

```javascript
const response = await client.send(command);
```

For the input above, the Amazon Bedrock response will look something like the response below.

```json
{
  "$metadata": {
    "httpStatusCode": 200,
    "requestId": "f871265d-b765-4c8e-ba69-f0f008fc81df",
    "attempts": 1,
    "totalRetryDelay": 0
  },
  "metrics": {
    "latencyMs": 8472
  },
  "output": {
    "message": {
      "content": [
        {
          "text": "Max Verstappen is a Belgian-Dutch racing driver who currently competes in the Formula One World Championship for Red Bull Racing. He is the son of former Formula One driver Jos Verstappen.\n\nBorn on September 30, 1997, in Hasselt, Belgium, Max Verstappen began karting at a young age and quickly rose through the junior ranks. He won several championships, including the European KF1 Championship and the World KZ Championship.\n\nVerstappen made his Formula One debut in 2015 with Toro Rosso, becoming the youngest driver to compete in the sport at the age of 17 years and 166 days. He scored his first points in his second race and went on to finish the season with 49 points.\n\nIn 2016, Verstappen was promoted to Red Bull Racing, replacing Daniil Kvyat. He won his first Grand Prix at the 2016 Spanish Grand Prix, becoming the youngest driver to win a Formula One race at the age of 18 years and 228 days.\n\nSince then, Verstappen has become one of the most successful and dominant drivers in the sport. He has won numerous Grands Prix, including multiple victories at tracks like Monaco, Austria, and Brazil. He has also been a consistent championship contender, finishing in the top three of the drivers' championship in several seasons.\n\nIn 2021, Verstappen won his first Formula One World Drivers' Championship, defeating Lewis Hamilton in a thrilling and controversial season finale. He successfully defended his title in 2022, winning a record 15 Grands Prix and securing the championship with several races to spare.\n\nVerstappen is known for his aggressive driving style, which has sometimes led to controversy and criticism. However, he is also widely regarded as one of the most talented and skilled drivers in the sport, with a strong work ethic and a deep understanding of the technical aspects of racing.\n\nOff the track, Verstappen is known for his laid-back and down-to-earth personality. He is a popular figure among fans and has a strong social media presence. He is also involved in various charitable initiatives, including supporting the Wings for Life Foundation, which aims to find a cure for spinal cord injuries."
        }
      ],
      "role": "assistant"
    }
  },
  "stopReason": "end_turn",
  "usage": {
    "inputTokens": 43,
    "outputTokens": 452,
    "totalTokens": 495
  }
}
```

From the above response, we can extract the `text` part of the `content` array. Also, notice that the role is labeled as assistant (some providers use `model` like Gemini).

### Multi-Turn Conversation:

Sometimes, just generating a response isn't enough, and we need a multi-turn conversation to handle follow-up prompts.

For a multi-turn chat, each time we use the _Bedrock client_, we must include the previous conversation with roles. The `user` role is for our prompt, and the `assistant` role is for the AI-generated response. The entire conversation is then sent in the `message` parameter.

You can find the implementation below.

```javascript
const buildMessage = (role, text) => ({
  role,
  content: [
    {
      text,
    },
  ],
});

const inferenceConfig = {
  maxTokens: 4096,
  temperature: 0.5,
  topP: 0.9,
};

const firstUserMessage = 'Tell me about Max Verstappen.';
const firstConversation = [buildMessage('user', firstUserMessage)];

const firstCommand = new ConverseCommand({
  modelId,
  messages: firstConversation,
  inferenceConfig,
});

const firstResponse = await client.send(firstCommand);
const firstAssistantReply = firstResponse.output.message.content[0].text;
console.log(firstAssistantReply);

const secondUserMessage = 'What team does he drive for?';
const secondConversation = [
  buildMessage('user', firstUserMessage),
  buildMessage('assistant', firstAssistantReply),
  buildMessage('user', secondUserMessage),
];

const secondCommand = new ConverseCommand({
  modelId,
  messages: secondConversation,
  inferenceConfig,
});

const secondResponse = await client.send(secondCommand);
```

The output will look something like this:

```json
{
  "$metadata": {
    "httpStatusCode": 200,
    "requestId": "c7bf1210-095b-48ff-b450-1e02aa1160b0",
    "attempts": 1,
    "totalRetryDelay": 0
  },
  "metrics": {
    "latencyMs": 825
  },
  "output": {
    "message": {
      "content": [
        {
          "text": "Max Verstappen drives for the Red Bull Racing team in Formula One."
        }
      ],
      "role": "assistant"
    }
  },
  "stopReason": "end_turn",
  "usage": {
    "inputTokens": 471,
    "outputTokens": 16,
    "totalTokens": 487
  }
}
```

> With multi-turn chat, each follow-up prompt will use more tokens, so keep an eye on this if you're using it.

### Streaming Response:

When using the generated output response, for example on the front end, we usually have to wait for the full response. This isn't ideal for long responses.

To solve this, we can use response streaming, which is supported by Amazon Bedrock.

For streaming, we need to use the `ConverseStreamCommand` instance instead of `ConverseCommand` in the implementation shown below.

```javascript
import {
  ConverseStreamCommand
} from '@aws-sdk/client-bedrock-runtime';

const conversation = [{
  role: 'user',
  content: [{
    text: 'Tell me about Max Verstappen, Red Bull Racing and his career over the years.'
  }, ],
}, ];

const command = new ConverseStreamCommand({
  modelId,
  messages: conversation,
  inferenceConfig,
});

const response = await client.send(command);

for await (const item of response.stream) {
  if (item.contentBlockDelta?.delta?.text) {
    const chunk = item.contentBlockDelta.delta.text;
    console.log(`${chunk}\n----`);
    yield chunk;
  }
}
```

Here, I've added logging to check each chunk coming from the streaming response. To see the streaming visually, render it on the front end or use `cUrl` in the terminal by adding this to an API route.

### Structured Output:

In most cases, we need structured data for better clarity and consistency. This is especially useful when we plan to use the response to write our own logic.

Some Amazon Bedrock models support structured data output, and Bedrock uses [tool use](https://docs.aws.amazon.com/bedrock/latest/userguide/tool-use.html) to get structured output. Although more functionality can be achieved with `tool use`, you can read more about it in the [docs](https://docs.aws.amazon.com/bedrock/latest/userguide/tool-use.html).

Since not all models support generating structured output, check which models support `tool use` in the documentation [here](https://docs.aws.amazon.com/bedrock/latest/userguide/conversation-inference-supported-models-features.html) before proceeding.

#### Implementation:

With **tool use,** we need to define a `toolSpec` for the structured data we want, then pass this tool to the Bedrock client to generate a response.

For example, let's look at the following `toolSpec` for a better understanding.

```javascript
const driverDetailsTool = [{
    toolSpec: {
      name: 'race_driver_info',
      description: 'Returns information about a Formula 1 driver in structured format',
      inputSchema: {
        json: {
          type: 'object',
          properties: {
            about: {
              type: 'string'
            },
            name: {
              type: 'string'
            },
            birthDate: {
              type: 'string'
            },
            nationality: {
              type: 'string'
            },
            team: {
              type: 'string'
            },
            championshipsWon: {
              type: 'integer'
            },
          },
          required: ['name', 'birthDate', 'nationality', 'team', 'championshipsWon'],
        },
      },
    },
  }, ],

  const courseTool = [{
    toolSpec: {
      name: 'javascript_course_generator',
      description: 'Generates a structured JavaScript course with multiple chapters',
      inputSchema: {
        json: {
          type: 'object',
          properties: {
            courseTitle: {
              type: 'string',
              description: 'Title of the course',
            },
            chapters: {
              type: 'array',
              description: 'List of course chapters',
              items: {
                type: 'object',
                properties: {
                  title: {
                    type: 'string',
                    description: 'Title of the chapter'
                  },
                  description: {
                    type: 'string',
                    description: 'Description of the chapter'
                  },
                },
                required: ['title', 'description'],
              },
            },
          },
          required: ['courseTitle', 'chapters'],
        },
      },
    },
  }, ];
```

As seen above, we need to define the structured data we want under the `toolSpec`. Here are some key points to remember when creating a tool:

- Provide a name and a clear description of the structured data we want.
- Under the `json` key of the `inputSchema` object, we need to outline the structure.
- For each field we want, include a `type` field for the data type and a description of what the data represents. Refer to the examples above for how to write concise descriptions.
- If arrays or objects are needed, extend them with the `properties` key and follow the same `type` and `description` format, or extend further as shown above.
- For each `array` or `object` type declared in the tool, include a `required` field for all the keys in that `array` or `object` to ensure the model recognizes all fields as required and responds without missing any keys (refer to the examples above).

After defining the tool, it needs to be sent with the bedrock runtime client we defined earlier. We’ll add the tool to the `ConverseStreamCommand` instance we created above, as shown in the following code:

```javascript
const command = new ConverseStreamCommand({
  modelId,
  messages: conversation,
  inferenceConfig,
  toolConfig: {
    tools: courseTool // or use driverTool,
    toolChoice: { auto: {} },
  },
});
```

As you can see, we have added the `toolConfig` object and specified the `tools` and `toolChoice`.

> You might wonder what `toolChoice` is, right? Well, [tool use](https://docs.aws.amazon.com/bedrock/latest/userguide/tool-use.html) refers to using external tools that can help the model generate a response if needed. Setting it to **auto** allows the model to decide whether to use the external tool for generating the response or to proceed without it. Since we don't need any external tool, we can simply set `toolChoice` to **auto**.

For the two tool examples above, here’s the Bedrock response using the model `meta.llama3-2-90b-instruct-v1:0`.

> Note: If you encounter the error "**Bedrock API invocation error - on demand throughput isn't supported. Retry your request with the ID or ARN of an inference profile that contains this model.**" even if you provided the correct model ID, it may be due to **“Cross-Region Inference”.**
>
> \*If the model you used has a “\*Cross-Region Inference” label next to it on the model availability request page in the AWS Bedrock console, you need to prefix it with the region like this:
>
> For the model `meta.llama3-2-90b-instruct-v1:0` for `us`, `eu`, or `apac` regions, you have to prefix the model ID with these, so it will look like this:
>
> - `us` regions: `us.meta.llama3-2-90b-instruct-v1:0`
> - `eu` regions: `eu.meta.llama3-2-90b-instruct-v1:0`
> - `apac` regions: `apac.meta.llama3-2-90b-instruct-v1:0`
>
> I resolved this error using the solution from [this blog](https://repost.aws/questions/QUEU82wbYVQk2oU4eNwyiong/bedrock-api-invocation-error-on-demand-throughput-isn-s-supported). Check it out for more details.

Now, let’s see the two responses:

**Using** `driverDetailsTool` **tool:**

```javascript
const driverPrompt = `
Extract structured information about the following Formula 1 driver.
Only return structured JSON using the provided schema.

Driver: Max Verstappen
`;

// Response
{
  "$metadata": {
    "httpStatusCode": 200,
    "requestId": "06f666bb-eca4-48cb-bf4a-aa2fa579302e",
    "attempts": 1,
    "totalRetryDelay": 0
  },
  "metrics": {
    "latencyMs": 1370
  },
  "output": {
    "message": {
      "content": [
        {
          "toolUse": {
            "input": {
              "name": "Max Verstappen",
              "birthDate": "September 30, 1997",
              "nationality": "Dutch",
              "team": "Red Bull Racing",
              "championshipsWon": "2"
            },
            "name": "race_driver_info",
            "toolUseId": "tooluse_Ye7CjMrNQw6Da-MqO0QmRA"
          }
        }
      ],
      "role": "assistant"
    }
  },
  "stopReason": "tool_use",
  "usage": {
    "inputTokens": 288,
    "outputTokens": 59,
    "totalTokens": 347
  }
}
```

**Using** `courseTool`**tool:**

```javascript
const coursePrompt = `
Generate a structured JavaScript course.
The course should have a title and a list of chapters.
Each chapter should include a title and a short description.

Only return structured JSON using the provided schema and return chapters as an array of JSON objects, not a stringified JSON.
`;

// Response
{
  "$metadata": {
    "httpStatusCode": 200,
    "requestId": "026e8ab6-5688-440e-ba93-e13ee5cd232f",
    "attempts": 1,
    "totalRetryDelay": 0
  },
  "metrics": {
    "latencyMs": 1481
  },
  "output": {
    "message": {
      "content": [
        {
          "toolUse": {
            "input": {
              "courseTitle": "JavaScript Course",
              "chapters": [
                {
                  "title": "Chapter 1",
                  "description": "Introduction to JavaScript"
                },
                {
                  "title": "Chapter 2",
                  "description": "Data Types and Variables"
                }
              ]
            },
            "name": "javascript_course_generator",
            "toolUseId": "tooluse_cIS9FDwBTrCENcLKpxM8cA"
          }
        }
      ],
      "role": "assistant"
    }
  },
  "stopReason": "tool_use",
  "usage": {
    "inputTokens": 302,
    "outputTokens": 60,
    "totalTokens": 362
  }
}
```

> Note: In the second example, I added the extra text **“return chapters as an array of JSON objects, not a stringified JSON.”** to the prompt. This is because if it's not specified, the chapters array might come as a stringified JSON object, which could cause issues since we would have to manually parse that data.

Now, with the help of the _SDK_, we have generated a _normal text response_, learned how to handle _multi-turn chat_, stream a response, and obtain _structured data_.

You can achieve the same result with the **REST API** endpoint if you prefer not to use the `SDK`. We'll explore this next.

## REST API Method:

In the **SDK Method** above, I covered most of the terms and use cases, so here we won't go into detail about that. We'll just look at how to implement all four functionalities using the API endpoint through code.

Before moving forward, make sure you’ve added required environment variables in your `env` file.

```bash
# AWS Configuration
AWS_REGION=
AWS_BEDROCK_MODEL=
AWS_BEARER_TOKEN_BEDROCK=
```

### Configuring API Endpoint:

The REST API endpoint is created dynamically using the `AWS_REGION` and `AWS_BEDROCK_MODEL` ID. Here's how the API URL is constructed:

```javascript
const { AWS_REGION: region, AWS_BEDROCK_MODEL: modelId } = process.env;

const url = `https://bedrock-runtime.${region}.amazonaws.com/model/${modelId}/converse`;
```

Since I use the `us-east-1` region and the `amazon.titan-text-lite-v1` model (ID), here’s what the constructed API endpoint will look like:

```bash
https://bedrock-runtime.us-east-1.amazonaws.com/model/amazon.titan-text-lite-v1/converse
```

### Text Response:

Using the above API endpoint, we can make a **POST** request to this endpoint using the `AWS_BEARER_TOKEN_BEDROCK` as a _Bearer Authorization_ token in the headers. In the payload, we need to send the messages field, which is an array of objects. Each object should have a role type (user) and content (containing the user's prompt).

Here's how this implementation looks (I use `axios`, but you can also use the built-in `fetch`):

```javascript
const {
  AWS_REGION: region,
  AWS_BEDROCK_MODEL: modelId,
  AWS_BEARER_TOKEN_BEDROCK: apiKey,
} = process.env;

const url = `https://bedrock-runtime.${region}.amazonaws.com/model/${modelId}/converse`;
const prompt = 'Tell me about Max Verstappen';
const payload = {
  messages: [
    {
      role: 'user',
      content: [{ text: prompt }],
    },
  ],
};

try {
  const response = await axios.post(url, payload, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  });

  console.log(response);
  const content = response.data?.output?.message?.content;
  const text = content?.find((c) => c.text)?.text;
  console.log(text);
} catch (err) {
  console.error(err);
}
```

For the implementation above, this is what the output will look like:

```bash
{
  "metrics": {
    "latencyMs": 8268
  },
  "output": {
    "message": {
      "content": [
        {
          "text": "Max Verstappen is a Dutch Formula One racing driver who currently drives for the Red Bull Racing team. He was born on September 30, 1997, in Hasselt, Belgium, to former Formula One driver Jos Verstappen and his Belgian wife, Sophie Kumpen.\n\nVerstappen began karting at a young age and quickly rose through the junior ranks, winning several championships, including the European KF1 Championship and the World KF1 Championship. In 2014, he made his Formula One debut at the Australian Grand Prix, driving for the Toro Rosso team, becoming the youngest driver to compete in a Formula One World Championship at the age of 17 years and 166 days.\n\nIn 2016, Verstappen joined Red Bull Racing, replacing Daniil Kvyat, and has since become one of the most successful drivers in the sport. He has won numerous Grands Prix and has been a consistent championship contender.\n\nVerstappen's driving style is known for being aggressive and bold, often pushing the limits of his car and taking risks to gain an advantage. He has been involved in several high-profile incidents and controversies throughout his career, including a notable collision with Lewis Hamilton at the 2021 British Grand Prix.\n\nDespite the controversies, Verstappen has established himself as one of the top drivers in Formula One, known for his exceptional speed, skill, and determination. He won his first Formula One World Drivers' Championship in 2021, narrowly beating Lewis Hamilton in a dramatic and contentious season finale.\n\nVerstappen's success has been recognized with numerous awards and accolades, including the Lorenzo Bandini Trophy, the FIA Personality of the Year award, and the Dutch Sportsman of the Year award.\n\nOff the track, Verstappen is known for his laid-back and down-to-earth personality. He is an avid gamer and has participated in several esports events, including the F1 Esports Series. He is also involved in various charity initiatives, including supporting the Wings for Life Foundation, which aims to find a cure for spinal cord injuries.\n\nOverall, Max Verstappen is a talented and accomplished Formula One driver who has quickly become a fan favorite and a dominant force in the sport."
        }
      ],
      "role": "assistant"
    }
  },
  "stopReason": "end_turn",
  "usage": {
    "inputTokens": 42,
    "outputTokens": 450,
    "totalTokens": 492
  }
}
```

### Multi Turn Chat:

For multi-turn chat, the `messages` array will contain the chat history. For each API call, you need to send the complete message history. This way, the model can understand the context of the previous chats and generate a response that fits the follow-up prompt.

In the implementation above, the message array looked like this:

```javascript
const messages = [
  {
    role: 'user',
    content: [{ text: 'Tell me about Max Verstappen' }],
  },
];
```

Let's say the model responded to the above prompt with: _“Max Verstappen is a Formula 1 race driver and is the current holder of the WDC (World Driver Championship).”_ If we want to add another follow-up prompt like _“What team does he drive for?”_ then the messages array we need to send in the next API call will look like this:

```javascript
const messages = [
  {
    role: 'user',
    content: [{ text: 'Tell me about Max Verstappen.' }],
  },
  {
    role: 'assistant',
    content: [
      {
        text: 'Max Verstappen is a Formula 1 race driver and is the current holder of WDC (World driver championship).',
      },
    ],
  },
  {
    role: 'user',
    content: [{ text: 'What team does he drive for?' }],
  },
];
```

> Note: Use the role **'assistant'** for the model's response.

Here's how we'll implement this in code:

```javascript
const buildMessage = (role, text) => ({
  role,
  content: [{ text }],
});

const firstUserMessage = 'Tell me about Max Verstappen.';
const firstConversation = [buildMessage('user', firstUserMessage)];

const firstResponse = await axios.post(
  url,
  { messages: firstConversation },
  {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  }
);

const firstAssistantReply = firstResponse.data.output.message.content?.find((c) => c.text)?.text;

console.log(firstAssistantReply);

const secondUserMessage = 'What team does he drive for?';
const secondConversation = [
  buildMessage('user', firstUserMessage),
  buildMessage('assistant', firstAssistantReply),
  buildMessage('user', secondUserMessage),
];

const secondResponse = await axios.post(
  url,
  { messages: secondConversation },
  {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  }
);

const secondAssistantReply = secondResponse.data.output.message.content?.find((c) => c.text)?.text;

console.log(secondAssistantReply);
```

Above, I added the `buildMessage` function to make it easier to create message objects for the chat history in the `messages` array.

Here’s what the output looks like for the implementation above:

```json
// First Response:

{
  "metrics": {
    "latencyMs": 6946
  },
  "output": {
    "message": {
      "content": [
        {
          "text": "Max Verstappen is a Dutch Formula One racing driver who currently drives for the Red Bull\nRacing team. He was born on September 30, 1997, in Hasselt, Belgium. Verstappen began\nkarting at a young age and quickly rose through the junior ranks, winning several\nchampionships.\n\nIn 2014, Verstappen made his Formula One debut with the Toro Rosso team at the age of 17,\nbecoming the youngest driver to compete in the sport at the time. He scored his first points\nin his second Grand Prix and went on to finish the season with 49 points.\n\nIn 2016, Verstappen moved to Red Bull Racing, replacing Daniil Kvyat. He won his first Grand\nPrix at the 2016 Spanish Grand Prix, becoming the youngest driver to win a Formula One\nWorld Championship Grand Prix at the time.\n\nVerstappen has since become one of the most successful drivers in the sport, winning\nnumerous Grands Prix and finishing as the runner-up in the 2020 and 2021 World Drivers'\nChampionships. In 2021, he won his first World Drivers' Championship, defeating Lewis\nHamilton in a dramatic and contentious season finale.\n\nVerstappen is known for his aggressive driving style and his ability to push his car to the\nlimit. He has also been involved in several high-profile controversies throughout his career,\nincluding a number of on-track incidents and disputes with other drivers.\n\nDespite these controversies, Verstappen remains one of the most popular and respected\ndrivers in the sport, with a large and dedicated fan base. He is also known for his close\nrelationship with his father, Jos Verstappen, who is a former Formula One driver and has\nplayed a significant role in his son's career.\n\nIn 2022, Verstappen successfully defended his World Drivers' Championship title, winning 15\nGrands Prix and finishing 146 points clear of his nearest rival, Charles Leclerc."
        }
      ],
      "role": "assistant"
    }
  },
  "stopReason": "end_turn",
  "usage": {
    "inputTokens": 43,
    "outputTokens": 393,
    "totalTokens": 436
  }
}

// Second response

{
  "metrics": {
    "latencyMs": 658
  },
  "output": {
    "message": {
      "content": [
        {
          "text": "Max Verstappen drives for the Red Bull Racing team in the Formula One World\nChampionship."
        }
      ],
      "role": "assistant"
    }
  },
  "stopReason": "end_turn",
  "usage": {
    "inputTokens": 452,
    "outputTokens": 19,
    "totalTokens": 471
  }
}
```

### Streaming Response:

To use the response as a stream, we need to use a different endpoint, although the dynamic construction of the API URL remains the same. The endpoint for streaming needs to be changed to `converse-stream` instead of `converse` at the end. The new API URL constructed for streaming will look like the following:

```bash
https://bedrock-runtime.us-east-1.amazonaws.com/model/amazon.titan-text-lite-v1/converse-stream
```

To learn more about the `converse-stream` endpoint, you can check out this [documentation](https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_ConverseStream.html).

Since `axios` doesn’t support fetching stream data, we’ll use the built-in `fetch` method. Here is what the implementation will look like:

```javascript
const {
  AWS_REGION: region,
  AWS_BEDROCK_MODEL: modelId,
  AWS_BEARER_TOKEN_BEDROCK: apiKey,
} = process.env;

const url = `https://bedrock-runtime.${region}.amazonaws.com/model/${modelId}/converse-stream`;
const streamConverse = async (prompt) => {
  const fetch = global.fetch;

  const payload = {
    messages: [
      {
        role: 'user',
        content: [{ text: prompt }],
      },
    ],
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        Accept: 'text/event-stream',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok || !response.body) {
      throw new Error(`HTTP ${response.status} - ${response.statusText}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');

    console.log('[Stream Start]');
    let buffer = '';
    const allChunks = [];

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        console.log('[Stream End]');
        console.log('\n[Final Response]:', allChunks.join(''));
        console.log('\n[Total Chunks]:', allChunks.length);
        break;
      }

      const chunk = decoder.decode(value, { stream: true });
      buffer += chunk;

      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const cleanLine = line.replace(/[^\x20-\x7E\n\r\t]/g, '').trim();

        if (!cleanLine) continue;

        let searchIndex = 0;
        while (true) {
          const messageTypeIndex = cleanLine.indexOf(':message-typeevent', searchIndex);
          if (messageTypeIndex === -1) break;

          const jsonStart = messageTypeIndex + ':message-typeevent'.length;

          let braceCount = 0;
          let jsonEnd = jsonStart;
          let foundStart = false;

          for (let i = jsonStart; i < cleanLine.length; i++) {
            const char = cleanLine[i];
            if (char === '{') {
              if (!foundStart) foundStart = true;
              braceCount++;
            } else if (char === '}') {
              braceCount--;
              if (foundStart && braceCount === 0) {
                jsonEnd = i + 1;
                break;
              }
            }
          }

          if (foundStart && braceCount === 0) {
            const jsonString = cleanLine.substring(jsonStart, jsonEnd);

            try {
              const data = JSON.parse(jsonString);

              if (data?.delta?.text) {
                console.log('[Chunk]:', data.delta.text);
                allChunks.push(data.delta.text);
              }
            } catch (err) {
              console.error('[JSON Parse Error]:', err.message, 'Raw JSON:', jsonString);
            }
          }

          searchIndex = messageTypeIndex + 1;
        }
      }
    }
  } catch (err) {
    console.error('[Stream Error]', err.message);
  }
};
```

Testing a streaming implementation can be difficult, so I recommend using this implementation in an API and using a terminal to log each chunk of the response coming from the stream.

### Structured Output:

To retrieve structured data output, we need to include a `toolConfig` (also known as `tool use`) field in the payload, which contains the tool—a JSON schema of how we want the structured output to be.

For more information about `tool use`, please check the _Structure Output_ section in the _SDK implementation_ above. To implement this, we must define a tool (a JSON schema of the output format) and include it in the payload. Here is how the implementation would look:

```javascript
const prompt = `Generate a structured JavaScript course.
The course should have a title and a list of chapters.
Each chapter should include a title and a short description.

Only return structured JSON using the provided schema and return chapters as an array of JSON objects, not a stringified JSON.`;

const messages = [
  {
    role: 'user',
    content: [{ text: prompt }],
  },
];

const tools = [
  {
    toolSpec: {
      name: 'javascript_course_generator',
      description: 'Generates a structured JavaScript course with multiple chapters',
      inputSchema: {
        json: {
          type: 'object',
          properties: {
            courseTitle: {
              type: 'string',
              description: 'Title of the course',
            },
            chapters: {
              type: 'array',
              description: 'List of course chapters',
              items: {
                type: 'object',
                properties: {
                  title: { type: 'string', description: 'Title of the chapter' },
                  description: { type: 'string', description: 'Description of the chapter' },
                },
                required: ['title', 'description'],
              },
            },
          },
          required: ['courseTitle', 'chapters'],
        },
      },
    },
  },
];

const payload = {
  messages,
  toolConfig: {
    tools,
    toolChoice: { auto: {} },
  },
};

try {
  const response = await axios.post(url, payload, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  });

  const content = response.data?.output?.message?.content || [];
  console.log(content);
} catch (err) {
  console.error(err);
}
```

For this implementation, the result would look like the following:

```javascript
{
  "metrics": {
    "latencyMs": 2630
  },
  "output": {
    "message": {
      "content": [
        {
          "toolUse": {
            "input": {
              "courseTitle": "JavaScript Fundamentals",
              "chapters": [
                {
                  "title": "Chapter 1: Introduction to JavaScript",
                  "description": "This chapter introduces the basics of JavaScript, including variables, data types, and functions."
                },
                {
                  "title": "Chapter 2: Control Structures",
                  "description": "This chapter covers control structures in JavaScript, such as conditional statements and loops."
                },
                {
                  "title": "Chapter 3: Functions",
                  "description": "This chapter explores functions in JavaScript, including function declarations, function expressions, and arrow functions."
                }
              ]
            },
            "name": "javascript_course_generator",
            "toolUseId": "tooluse_RdFMcX8GTMGUqxVNFsXubQ"
          }
        }
      ],
      "role": "assistant"
    }
  },
  "stopReason": "tool_use",
  "usage": {
    "inputTokens": 342,
    "outputTokens": 125,
    "totalTokens": 467
  }
}
```

> Note: The data here may not be accurate because the model's training data is outdated.

Now that we have implemented _text generation_, _multi-turn chat_, _streaming responses_, and _retrieving structured data_ using the REST API method, you can proceed to implement Amazon Bedrock using any of these SDKs or REST API methods.

You can also find this entire implementation in my [aws-bedrock GitHub repo](https://github.com/dushmanta05/aws-bedrock/tree/main/node), where I’ve included both the SDK and REST API versions.

---

I hope this article helps you learn how to implement Amazon Bedrock in your JavaScript project. We've explored two methods: using the SDK and the REST API to generate responses. I hope you found this helpful. I would love to hear your feedback, so if you encounter any issues while implementing or notice any mistakes, please feel free to comment or contact me. Thank you. Happy coding! :)
