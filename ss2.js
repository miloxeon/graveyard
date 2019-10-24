{
  nodes: [
    {
      address: '127.0.0.1:1234',
      env: { ... }
    },
    'node1.cloudsystem.com',
    'node2.cloudsystem.com',
    'node3.cloudsystem.com',
    'node4.cloudsystem.com'
  ],
  commons: {
    repo: 'registry.cloudsystem.com',
    env: { ... },
    retries: 5,
    retryDelay: 2000,
    retryPattern: 'lambda retry, delay: retry * delay',
    timeLimit: 20000
  },
  tasks: {
    task1: {
      schedule: 'once',
      entry: 'task1'
    },
    task2: 'task2'
  },
  deps: ['task1' 'task2']
}

there are the master and slaves
they are servers
they communicate via websockets
the code is stored into docker images
docker images are stored in global registry accessible to slaves
master manages the slaves
master just spawns and kills tasks
master manages the io
tasks are executed on slave servers
tasks can communicate with master via websockets
tasks communicate wich each other sequentially via stdio
logs and communication formats are up to user
master watches the config and acts accordingly when its changed
one slave can run multiple tasks in separate processes
