# Apollo tutorial

This is the fullstack app for the [Apollo tutorial](http://apollographql.com/docs/tutorial/introduction.html). 🚀

## File structure

The app is split out into two folders:

- `start`: Starting point for the tutorial
- `final`: Final version

From within the `start` and `final` directories, there are two folders (one for `server` and one for `client`).

## Installation

To run the app, run these commands in two separate terminal windows from the root:

```bash
cd final/server && npm i && npm start
```

and

```bash
cd final/client && npm i && npm start
```

# Demo

Query <br/>
=> query {
launch(id: 60) {
id
site  
 rocket {
id
name
type
}
}
launches {
site
mission {
name
missionPatch(size:LARGE)  
 }
}
me {
id
email
trips {
id
isBooked
mission {
name
missionPatch
}
}
}
}

=> query v1{
launch(id: 60) {
id
site
mission{
missionPatch
}
}  
}

=> query ($id: ID!) {
  launch(id: $id) {
id
rocket {
id
type
}
}
}

Variables
{ "id": 60 }

=> query {
launchesWithPaging(pageSize: 3, after: "0") {
cursor
hasMore
launches {
id
site
}
}
}

mutation
=> mutation LoginUser {
login(email: "daisy@apollographql.com")
}

=> mutation BookTrips {
bookTrips(launchIds: [67, 68, 69]) {
success
message
launches {
id
}
}
}

http headers
{
"authorization": "ZGFpc3lAYXBvbGxvZ3JhcGhxbC5jb20="
}
