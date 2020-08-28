# Instructions

Run main file with test.txt file as Input

```bash
cat test.txt | node index.js 
```

# Debug

Create a launch.json file in VS Code
```json
 {
      "command": "cat test.txt | node ${workspaceFolder}/index.js",
      "name": "Run npm start",
      "request": "launch",
      "type": "node-terminal"
    }
```