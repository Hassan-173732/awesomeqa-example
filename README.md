# Awesome ticket challenge

### Backend

Steps to setup the backend environment:

1. [Download the ticket data here](https://drive.google.com/file/d/1Bvk2mW5t3GfkqTkpURiFpaLuqrUckzUX/view?usp=sharing)
2. Place it in data/awesome_tickets.json
3. Run `make setup`
4. Run `make run`
5. Try it by calling [http://localhost:5001/tickets](http://localhost:5001/tickets)

### Frontend

1. Run `make setup`
2. Run `make run`
3. Open it: [http://localhost:3002](http://localhost:3002)

### Testing Note: please only follow the step 2 in Backend testing if you want to run test cases, in order to run the application you have to revert the changes back e.g. TICKET_FILEPATH = os.path.join(os.getcwd(), "app", "data", "awesome_tickets.json")
Backend: 
1. install pytest by executing pip install pytest pytest-asyncio
2. update line 21 on main.py TICKET_FILEPATH = os.path.join(os.getcwd(), "app", "data", "awesome_tickets.json") and change to TICKET_FILEPATH = os.path.join(os.getcwd(), "data", "awesome_tickets.json")
3. run python -m pytest
 
### Happy coding 🎉
