## Table of Contents

1. [Install](#install)
2. [Introduction](#introduction)

<h2 align="center">Install</h2>

##### Expect Node 18.x or higher

Clone source with SSH url:

```bash
git clone git@github.com:anhchangvt1994/vite-project--template-react-ts.git
```

Install:

```bash
cd vite-project--template-react-ts
```

If use npm

```bash
npm install
```

If use yarn 1.x

```bash
yarn install
```

<h2 align="center">Introduction</h2>

This project is an advanced structure and configuration of scaffolded Vite + React + Typescript project.

### Table of structure's benefit information that you must use

- [env](#env) - emvironment directory
- [src](#src) - include assets and coding of project
- [tailwind.config.cjs](#tailwincss)
- [vite.config.ts](#vite.config.ts) - unplugin-auto-import configuration
- [vite.production.config.ts](#vite.production.config.ts) - NormalSplitChunks configuration, External configuration

<h3>env</h3>

```bash
├── env/
│   ├── env.[prefix].mjs
│   ├── env-register.mjs
│   └──
└──
```

**env** directory contains environment variable files used to manage environment variable by using .mjs file. You will define environment variables in .mjs file instead of .env file.

##### Why use it ?

1. I think defining environment variables in javascript file will similar with JS developer and better for managing than .env file.

Compare them

```javascript
// env.router.mjs
export default {
  prefix: 'router',
  data: {
    home: {
      path: '/',
      id: 'HomePage',
    },
  },
}
```

```.env
# .env
ROUTER_HOME_PATH=/
ROUTER_HOME_ID=HomePage
```

2. Think that you can define any type (not only string like .env) when define env in javascript file.

Imagine that you need to define a payment code validation array

```javascript
// env.router.mjs
export default {
  prefix: 'payment',
  data: {
    valid_code: [0, 1, 2, 3],
  },
}
```

```.env
# .env
PAYMENT_VALID_CODE=[0,1,2,3] #wrong
PAYMENT_VALID_CODE="[0,1,2,3]" #right (you must stringify it)
```

3. The hot benefit of this advanced structure bring out for Environment Variables is the **ImportMeta.d.ts** generating automation. With this ability, the code editor will auto suggestion available env for you.

You have a large env difination and have to open file, cop and paste variable key when want to use it. Forget it !!!

##### How to use it ?

Imagine that you need create a new env for an api title (prefix) to store all of api endpoint string

1. Create an **env.api.mjs** file and finish that

```javascript
// env.api.mjs
export default {
  prefix: 'api',
  data: {
    user: {
      info: '/api/user/info',
      edit: '/api/user/edit',
    },
    product_list: '/api/product',
  },
}
```

2. Open **env-register.mjs** and regist it

```javascript
// env-register.mjs
import ENV_API from './env.api.mjs'

export default [ENV_API]
```

Tada! Done! you're so cool

<h3>src</h3>

```bash
├── src/
│   ├── App.ts
│   ├── App.vue
│   ├── assets/...
│   ├── pages/...
│   ├── components/...
│   ├── config/...
│   └── utils/...
└──
```

The **src directory** contains the resource's assets and logic of your codes like:

| file / directory | Description                                                                                                                                       |
| :--------------: | ------------------------------------------------------------------------------------------------------------------------------------------------- |
|    **App.ts**    | contains initialization code of vue                                                                                                               |
|   **App.vue**    | contains default layout code of vue                                                                                                               |
|   **assets/**    | contains asset files <br/>**styles**: assets > styles > main.scss <br/>**images**: assets > static > images > logo.svg                            |
|    **pages/**    | contains files of pages layout (ex: HomePage.vue)                                                                                                 |
| **components/**  | contains files of component <br/> **global**: components > [GlobalComponentName].tsx <br/> **page**: components > HomePage > ProductSection.tsx   |
|   **config/**    | contains files of libs or plugins configuration <br/> **react-router-dom**: config > router > index.ts <br/> **redux**: config > store > index.ts |
|    **utils/**    | contains files of your customization like <br/> **React Hooks, Libs, Plugins**                                                                    |

##### Tip:

1. If your code editor has TSServer, the **paths** options of **tsconfig.json** will provide a list of alias for your code editor. That will make you happy with auto alias suggestion when you're typing.

![alt text](/src/assets/static/images/development/auto-alias-suggestion.png 'Title')

```javascript
// Normal way you must
import './assets/styles/...'

// tsconfig with paths options
import 'assets/styles/...'
```

In this case, that looks like the same, except **" ./ "**. But when you move **index.ts** to another location (ex: move it into **pages/**), the path with **" ./ "** will wrong and the path with alias still right.

2. You will see that the **images/** directory placed in **static/** directory. Because in this project the **static/** is set to [publicDir](https://vitejs.dev/config/shared-options.html#publicdir). That means all of directories and files in **static/** directory will just copied to **dist/** and does not compiled or hash name.

Normal case in React project, you can handle asset files with some solutions

```jsx
// 1. import and use it
import Logo from 'assets/images/logo.svg'

return <img src={Logo} />

// 2. require (but vite does not support require statement, you can do that in webpack project)
return <img src={require('assets/images/logo.svg')} />
```

In case use **publicDir**, you just easy set static files like a string

```html
<!-- Very similar and you finish! -->
<img src="/images/logo.svg" />
```

<h3>tailwind.config.cjs</h3>

All of your tailwind config for your project
[tailwind config docs](https://tailwindcss.com/docs/configuration)

<h3>vite.config.ts</h3>

##### unplugin-auto-import configuration

##### Why use it ?

In the normal, think that if you want to use **useState** in **react** you have to:

```javascript
import { useState } from 'react'

const [something, setSomething] = ref(value)
```

But if you configed auto-import before, you just do like code below. And don't worry about suggestion or wrong linting.

```javascript
const [something, setSomething] = ref(value)
```

##### How to use it ?

I configed the auto-import into **vite.config.ts**, the syntax of configuration is like this

```javascript
{
  plugins: [
    AutoImport({
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.md$/, // .md
      ],
      imports: [
        // presets
        'react',
        {
          react: [
            ['*', 'React'],
            'Suspense',
            'componentDidCatch',
            'StrictMode',
            'createContext',
          ],
        },
        {
          'react-dom/client': ['createRoot'],
        },
        {
          'styled-components': [
            ['default', 'styled'],
            'createGlobalStyle',
            'keyframes',
          ],
        },
        {
          polished: ['rgba'],
        },
      ],
      dts: './config/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
        filepath: './config/.eslintrc-auto-import.json',
      },
    })
  ],
}
```

|   Options    | Description                                                                                                                                                                                                                                                                                                                                                                                 |
| :----------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **include**  | Is list of file extension that will be applied the auto-import                                                                                                                                                                                                                                                                                                                              |
| **imports**  | Set what dependencies and values will be valid to auto-import, unplugin-auto-import available some popular libs like: vue, react, solid ... [see more](https://github.com/antfu/unplugin-auto-import/tree/main/src/presets) <br /> Another hand, you can custom some of new your auto-import by using [advanced configuration](https://github.com/antfu/unplugin-auto-import#configuration) |
|   **dts**    | Where you want to place **auto-imports.d.ts** file, this file will support for auto suggestion ability                                                                                                                                                                                                                                                                                      |
| **eslintrc** | Where you want to place **.eslintrc-auto-import.json** file, this file will support for linting validation                                                                                                                                                                                                                                                                                  |

<h3>vite.production.config.ts</h3>

##### NormalSplitChunks

This configuration used to support for splitting chunks of files. This solution help to reduce the file's sizes in loading processes by loading multiple files with smaller sizes.

##### Why use it ?

Reduce file's sizes, can enhance loading resource performance.

Note: Don't use this solution for all cases, because the large amount of file be loaded in the bad internet connection will make the loading resource process be slower and can be broken.

##### How to use it ?

I configed the NormalSplitChunks into **vite.production.config.ts**, the syntax of configuration is like this

```javaScript
NormalSplitChunks([
  /node_modules\/([^/]+)/,
  /utils\/([^/]+)/,
  /config\/([^/]+)/
]),
```

In this case, I configed to split any files in node_modules, utils and config directories. About pages and components directories you can use **dynamic import** to manual handle split-chunks.

Note: You can use regex (remember \/([^/]+)) or string to config for NormalSplitChunks.

##### ESM External in CDN

This configuration is an optional, you can read or ignore it.
The **ESM External CDN** is a solution used to replace some node_module dependencies by the corresponding ESM module in a CDN hosting.

Imagine that you have a code like this

```javascript
import { useState } from 'react'
```

The 'react' is a node_module dependency, you can see that infor in package.json.

![alt text](/src/assets/static/images/development/node-module-dependencies.png 'Title')

After the build tool compiles the file include the import dependencies syntax, the system will print dependency's logic code into owner file or split it into another chunk if you have configed split-chunks for that dependency. But when you define external for that dependency, the system will replace it with the synchronize insert script syntax like split-chunks case, but different about where src="from". In **ESM External CDN** case the src will from CDN hosting.

The configuration syntax like this

```javascript
{
  // [key is dependency name]: value is esm cdn url (in this case I use https://esm.sh/)
  react: 'https://esm.sh/react@18.2.0',
  'react-dom': 'https://esm.sh/react-dom@18.2.0',
  'styled-components': 'https://esm.sh/styled-components@5.3.6',
  polished: 'https://esm.sh/polished@4.2.2',
}
```

You can use below command line to try

```bash
npm run build:esm
```
