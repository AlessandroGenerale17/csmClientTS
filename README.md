# CodeBuster <img width='40px' src='https://2019.breizhcamp.org/img/carousel/code-busters.png' />

CodeBuster is a small prototype for a code snippet manager.

Find the deployed version <a href='https://codebuster.netlify.app'>here</a>!

### Project Motivation

I often find myself searching for <b>one</b> specific piece of code. I either try to remember what keywords I entered in the Google search bar or randomly search through my GitHub repos. The idea behind this prototype for a snippet manager  is to give the ability to a user to save her / his snippets of code and make them easy to retrieve for future reference. 

I wanted to extend upon this feature to allow users to also share snippets of code that is not working. A user can create an issue snippet that is either private or public. If public, the snippet is shown in the home feed. Other users can see the issue snippet and comment giving suggestions or enter the live discussion. The live discussion is a simple chat room where users can exchange messages in order to offer solutions to the owner of the snippet. The owner of the snippet can update the content of the snippet at any time and the changes will be reflected to all connected users in the live discussion. 

As a final **WIP** feature, I created a `challenges` section where users can <b>only</b> (for now) practice their  **JavaScript** skills. I wanted to try and emulate the logic behind existing sites like <a href='https://leetcode.com/'>LeetCode</a> and <a href='https://www.hackerrank.com/'>HackerRank</a>. There are different challenges displayed in a similar table to the one of the snippets. A user can select a challenge and run a local test case (always the first of the list of testcases that is used to test the submission). A user can edit the local testcase with their own to check their code. When the user submits the solution, all cases are tested. 

### Tech Stack

#### Front-end

<img src='https://camo.githubusercontent.com/c2cca0fe542f9c1271669790c7ebb6abed9cbd25d6b2cd4863b70c3951ea2df6/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f547970657363726970742d3331373843363f6c6f676f3d74797065736372697074266c6f676f436f6c6f723d7768697465267374796c653d666f722d7468652d6261646765' /><img src='https://camo.githubusercontent.com/876426d64480dd18283dc72bcf0f293d6871c746d5358168e28565efc1c0334d/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f52656163742d3631444146423f6c6f676f3d7265616374266c6f676f436f6c6f723d7768697465267374796c653d666f722d7468652d6261646765'>
<img src='https://camo.githubusercontent.com/a3bbc59f190482c45788b1d213d1dc1b8f426691e0e6320aefe31bc6832f3491/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f52656475782d3736344142433f6c6f676f3d7265647578266c6f676f436f6c6f723d7768697465267374796c653d666f722d7468652d6261646765' />
<img width='79px' src='https://camo.githubusercontent.com/2435c2a64789b8a71c701a1a593b4a6e6869789bfb0626e515dc2a6b6dffa6c5/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d435353332d3135373242363f7374796c653d666c61742d737175617265266c6f676f3d63737333'>
<img width='75px' src='https://cdn-images-1.medium.com/max/1200/0*Ycp0d6CqDMIGWBrY.png' />

#### Back-end

<img src='https://camo.githubusercontent.com/ba7b5a94c5934bd53128b7600332064a41d97c343ebc19e72c048daae18ea5d1/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e6f64652e6a732d3333393933333f6c6f676f3d6e6f64652e6a73266c6f676f436f6c6f723d7768697465267374796c653d666f722d7468652d6261646765' /><img src='https://camo.githubusercontent.com/54d885a39ff8ae8e17e1f9dd9286eb8e754d4c44c6ff3a31b2ba8f143f454254/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f457870726573732d3030303030303f6c6f676f3d65787072657373266c6f676f436f6c6f723d7768697465267374796c653d666f722d7468652d6261646765' />
<img src='https://camo.githubusercontent.com/ea0a0d5491e470f09b738a5b5412dc143ffdb1018f4ead88124374ffc576dbd4/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f506f737467726553514c2d3431363945313f6c6f676f3d706f737467726573716c266c6f676f436f6c6f723d7768697465267374796c653d666f722d7468652d6261646765' />
<img src='https://camo.githubusercontent.com/1d7814efc567041c56f7cb83654566f6be83d8b2ff4392b6c1321bfeed7d7dc1/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f53657175656c697a652d3532423045373f6c6f676f3d73657175656c697a65266c6f676f436f6c6f723d7768697465267374796c653d666f722d7468652d6261646765' />
<img width='75px' src='https://cdn-images-1.medium.com/max/1200/0*Ycp0d6CqDMIGWBrY.png' />



#### UI Frameworks
Material UI  

<img width='70px' src='https://cdn-media-1.freecodecamp.org/images/1*FDNeKIUeUnf0XdqHmi7nsw.png' />

React Bootstrap

<img width='70px' src='https://www.educative.io/v2api/editorpage/5816757605367808/image/6486746733740032' />

### Wireframe <a href='https://wireframepro.mockflow.com/editor.jsp?editor=on&spaceid=MgxsCJjWTmb&bgcolor=white&perm=Create&pcompany=C713224b83f6f4595a5fcdb9548d22712&ptitle=Code%20Snippet%20Manager&category=web&projectid=MyKWjrkWTmb&publicid=e3cb30dd9c444588b26a72d4067fe6c6#/page/4cd2e8a855314014bda27709d8a63d4c'>Click me!</a>


### Database Model <a href='https://dbdiagram.io/d/617a7c2efa17df5ea67338fc'>Click me!</a>



### Demo

#### Home Feed
<img src='https://media.giphy.com/media/YMIAJPRc9shVNol0UI/giphy.gif' alt='homeFeed'>

#### Snippet Manager
<img src='https://media.giphy.com/media/9HtL8xxS5kZMzJeWRc/giphy.gif' alt='snippetManager'>

#### Add a snippet
<img src='https://media.giphy.com/media/Tj3v5117QTy0QV4xmf/giphy.gif' alt='addSnippet'>

#### Issue snippet
<img src='https://media.giphy.com/media/HGqkzP5SNXG1as7lkD/giphy.gif' alt='livechat'>
<img src='https://media.giphy.com/media/caLLuzXhlf0Fy0Ah4C/giphy.gif' alt='livechat2'>

#### Challenges
<img src='https://media.giphy.com/media/ppb1Hj3r46x2vQjTlD/giphy.gif' alt='challenge' />

