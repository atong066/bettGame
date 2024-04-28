Task Manager API Documentation

1. Red Packet
-Purpose
Defines a function named envelpeDetails responsible for making an asynchronous GET request to the "/userCenter/redpacket/curNew.do" API endpoint using the Axios library. The function updates the state variable envelope based on the response received from the API.

-State Variable
envelope: State variable used to store details about the current red packet.

-Function Logic
Imports the necessary dependencies, including the useState hook for managing state and the Axios library for making HTTP requests.
Defines the envelpeDetails function, which is an asynchronous function responsible for fetching details about the current red packet.
Uses the axios.get method to send a GET request to the "/userCenter/redpacket/curNew.do" API endpoint.
Sets the envelope state variable with data received from the API response.

-API Request
Method: GET
Endpoint: /userCenter/redpacket/curNew.do

2. Get config
-Purpose
Defines a function named getConfig responsible for making an asynchronous POST request to the "/userCenter/agentManage/agentRegPromotionInfo.do" API endpoint using the Axios library. The function updates state variables based on the response received from the API.

-State Variables
configList: State variable used to store configuration arrays for different categories such as chess, e-game, e-sport, fishing, live, lottery, and sport.
agentType: State variable storing information about the agent type.
defagentType: State variable storing default agent type information.
formData: State variable used to store form data, including the user type.

-Function Logic
Imports the necessary dependencies, including the useState hook for managing state and the Axios library for making HTTP requests.
Defines the getConfig function, which is an asynchronous function responsible for fetching agent registration promotion information.
Uses the axios.post method to send a POST request to the "/userCenter/agentManage/agentRegPromotionInfo.do" API endpoint.
Sets various state variables (configList, agentType, defagentType, and formData) with data received from the API response.

-API Request
Method: POST
Endpoint: /userCenter/agentManage/agentRegPromotionInfo.do



3. Get Carousel images
-Purpose
Defines a function named fetchCarouselImage that is responsible for fetching images from the "/banner.do" API endpoint using the Axios library. The function sets the component state variable image with the data received from the API

Endpoint: /banner.do
Method: GET
Description: Retrieves an array of images for the carousel.

-Response:
An array of image objects, where each object contains the following properties:
url (String): URL of the image.
alt (String): Alternative text for the image.

4. Recharge Info
-Purpose
It uses the useLayoutEffect hook to perform an asynchronous operation - fetching recharge information from the /userCenter/finance/rechargeInfo.do API endpoint. The purpose of this functionality is to retrieve a list of available bank cards for recharge and set the component state accordingly.

State Variables
cards: State variable used to store the list of bank cards retrieved from the API.
activeCard: State variable representing the currently active bank card (excluding those with the payPlatformCode "USDT").
Hook Usage
useLayoutEffect: The useLayoutEffect hook is employed to ensure that the API call and state updates occur synchronously before the component renders. This hook is typically used for operations that directly affect the layout.

-Function Logic
Imports the necessary dependencies, including the useLayoutEffect hook.
Defines the fetchRechargeInfo function, which performs the asynchronous operation using Axios to fetch recharge information.
Sets the component state (cards and activeCard) based on the data received from the API.
Utilizes the useLayoutEffect hook to trigger the API call and state updates when the component mounts ([] as the dependency array ensures it only runs once).

-API Request
Method: POST
Endpoint: /userCenter/finance/rechargeInfo.do


5. Join Event
-Purpose
The joinEvent function is designed to handle the process of joining an event. It checks whether the event can be opened (canopen parameter) and displays appropriate error messages using ToastrPngk if the conditions are not met. If the event can be opened, the function sends a POST request to the /joinAct.do API endpoint, providing the necessary parameters (value and actId). The function also handles the response from the API, updating the state and displaying success or error messages.

-Endpoint: /joinAct.do
Method: POST
Description: Participates in a specific event by sending a POST request to the /joinAct.do API.
Parameters
value (any, required): The bonus ID associated with the event.
canopen (any, required): A boolean indicating whether the event can be joined.

-Function Logic
If canopen is false, the function displays an error message using ToastrPngk and returns 0.
If canopen is not true, the function displays another error message using ToastrPngk and returns 0.
If the conditions are met, the function sends a POST request to /joinAct.do with the specified parameters.

-API Request
Method: POST
Endpoint: /joinAct.do
Request Body:
bonusId (any): Bonus ID associated with the event.
actId (any): ID of the event..

-API Response
{
  "success": true|false,
  "msg": "Response message"
}

6. Get External Link Information
-Purpose
The getRecommendInfo function is responsible for fetching information related to agent recommendations from the /userCenter/agentManage/recommendInfo2.do API endpoint. It performs a GET request using axios and updates state variables with the received data.

Endpoint: /userCenter/agentManage/recommendInfo2.do
Method: GET
Description: Retrieves information related to external links for agent management.

-Function Logic
Sends a GET request to the /userCenter/agentManage/recommendInfo2.do API to fetch external link information.
Sets the retrieved data using setExlink.

-API Request
Method: GET
Endpoint: /userCenter/agentManage/recommendInfo2.do
Request Headers:
Content-Type (String): "application/x-www-form-urlencoded; charset=UTF-8"
X-Requested-With (String): "XMLHttpRequest"

-API Response
The API response is expected to contain the external link information.
-------------------------------------------------------------
7.Fetch Activity Page Data
-Purpose
The fetchData function is designed to fetch data related to activity pages from the /activityPage.do API endpoint. It performs a GET request using axios and handles the API response to update state variables, including activity details, update time, and over time.

Endpoint: /activityPage.do
Method: GET
Description: Retrieves data related to the activity page.

-Function Logic
Sends a GET request to the /activityPage.do API to fetch activity page data.
Extracts relevant information from the response, such as the first activity object, update time, and over time.
Formats the timestamps using the dateFormat function and updates state variables accordingly.

-API Request
Method: GET
Endpoint: /activityPage.do

-API Response
The API response is expected to contain information about activities, where each activity object has properties such as updateTime and overTime. 

8. UserCenter
-Purpose
The getEarnings function fetches earnings information from the /userCenter/userCenterBill/index.do API and updates state variables with the received data.

-Function Logic
Sends a GET request to the /userCenter/userCenterBill/index.do API to retrieve earnings information.
Updates the state variable earning with the entire response data.
Updates the state variable yesterdayEarning with the yesterdayRecord property from the response.
Updates the state variable dayYesterdayEarning with the qiantianRecord property from the response.

-API Request
Method: GET
Endpoint: /userCenter/userCenterBill/index.do
Request Headers:
Content-Type (String): "application/x-www-form-urlencoded; charset=UTF-8"

-API Response
The API response is expected to contain earnings information, where yesterdayRecord and qiantianRecord are properties within the response.

9.moneyIncomeList 
-Purpose
The getEarnings function fetches earnings information from the /userCenter/userCenterBill/moneyIncomeList.do API based on a specified time range and page number. It updates state variables and loader status based on the received data.

-API Request
Method: POST
Endpoint: /userCenter/userCenterBill/moneyIncomeList.do
Request Parameters:
startTime (String): Start time for earnings data.
endTime (String): End time for earnings data.
pageNumber (Number): Page number for pagination.
Request Headers:
Content-Type (String): "application/x-www-form-urlencoded; charset=UTF-8"

-API Response
The API response is expected to contain information about earnings, with total representing the total number of records and rows containing the actual data.

10. Chart Data
-Purpose
The getChart function fetches chart data from the /userCenter/userCenterBill/eChartData.do API based on a specified time range. It updates state variables and loader status based on the received data.

-Function Logic
Sets the loader to open (setOpenLoader(true)) to indicate that data is being fetched.
Sends a POST request to the /userCenter/userCenterBill/eChartData.do API with the specified parameters:
startTime and endTime: Time range for chart data.
Checks if the response contains statDate and scale properties.
If present, updates state variables startDate and scale with the corresponding values from the response.
Closes the loader (setOpenLoader(false)).

-API Request
Method: POST
Endpoint: /userCenter/userCenterBill/eChartData.do
Request Parameters:
startTime (String): Start time for chart data.
endTime (String): End time for chart data.
Request Headers:
Content-Type (String): "application/x-www-form-urlencoded; charset=UTF-8"

-API Response
The API response is expected to contain chart data with statDate representing the statistical date and scale containing the scale information. 

11. Sign-in
-Purpose
The signInbonus function allows users to claim a sign-in bonus by making a POST request to the /userSignIn.do API. It includes logic to check eligibility and handle the response accordingly. The function updates state variables related to the sign-in bonus and triggers data refetching.

-Function Logic
Checks if the user has already signed in (sigIn.data.signed is true) and if the sign-in count is less than or equal to the specified day. If conditions are met, displays an error message indicating the user is not eligible.
Makes a POST request to the /userSignIn.do API with the specified signType parameter (id).
Handles the response:
If the response indicates failure (response.data.success is false), displays an error message.
If the response indicates success, updates global variables related to the reward and triggers data refetching.
Displays a success message.

-API Request
Method: POST
Endpoint: /userSignIn.do
Request Parameters:
signType (any): The ID of the sign-in bonus to claim.
Request Headers:
X-Requested-With (String): "XMLHttpRequest"
Content-Type (String): "application/x-www-form-urlencoded"

-API Response
The API response is expected to contain a success property indicating whether the sign-in was successful. If unsuccessful, the response may include an error message (msg).

12. Invite Deposits
-Purpose
The getBetHistory function retrieves bet history data from the /userCenter/inviteDeposits.do API based on a specified time range, page size, and page number. It updates state variables with the received data and calculates the total number of pages for pagination.

-Function Logic
Sends a GET request to the /userCenter/inviteDeposits.do API with the specified parameters:
startTime and endTime: Time range for bet history.
pageSize: Number of items to display per page (set to "10").
pageNumber: Page number for pagination.
Checks if the response contains content.
If content is present, calculates the total number of pages based on the length of the content and sets the page count using setPageCount.
Updates the state variable depositData with the content from the response.
Sets isData to true if content is present; otherwise, sets it to false.

-API Request
Method: GET
Endpoint: /userCenter/inviteDeposits.do
Request Parameters:
startTime (String): Start time for bet history data.
endTime (String): End time for bet history data.
pageSize (String): Number of items to display per page (set to "10").
pageNumber (Number): Page number for pagination.
Request Headers:
Content-Type (String): "application/x-www-form-urlencoded;charset=UTF-8"

-API Response
The API response is expected to contain content representing the bet history data.

13. UserList Data
-Purpose
The getPersonalReport function retrieves personal report data from the /userCenter/agentManage/userListData.do API based on specified criteria. It updates state variables with the received data, handles success and error responses, and manages loading status.

-Function Logic
Sets the loader to open (setOpenLoader(true)) to indicate that data is being fetched.
Makes a POST request to the /userCenter/agentManage/userListData.do API with the specified parameters:
startTime and endTime: Time range for the report.
pageNumber: Page number for pagination.
include: Lower level inclusion criteria.
username: Account name criteria.
minBalance and maxBalance: Minimum and maximum balance criteria.
depositTotal: Total deposit criteria.
level: User type criteria.
Checks the response for success.
If the response indicates failure (response.data.success is false), sets isData to false, displays an error message, and closes the loader.
If the response contains rows, calculates the total number of pages (totalPageCount) and sets the page count using setPageCount.
Updates the state variable historySport with the rows from the response.
Sets isData to true.
Closes the loader.

-API Request
Method: POST
Endpoint: /userCenter/agentManage/userListData.do
Request Parameters:
startTime (String): Start time for the report.
endTime (String): End time for the report.
pageNumber (Number): Page number for pagination.
include (Boolean): Lower level inclusion criteria.
username (String): Account name criteria.
minBalance (Number): Minimum balance criteria.
maxBalance (Number): Maximum balance criteria.
depositTotal (Number): Total deposit criteria.
level (String): User type criteria.
Request Headers:
Content-Type (String): "application/x-www-form-urlencoded"
X-Requested-With (String): "XMLHttpRequest"

-API Response
The API response is expected to contain information about the personal report, including rows representing the report data. If the response indicates failure, it may include an error message (msg).

14. User Packet records
-Purpose
The getScoreHistory function retrieves score history data from the /userCenter/redpacket/getUserRedPacketRecordPage.do API based on a specified time range, page number, and page size. It updates state variables with the received data and manages loading status.

-Function Logic
Sets the loader to open (setOpenLoader(true)) to indicate that data is being fetched.
Makes a POST request to the /userCenter/redpacket/getUserRedPacketRecordPage.do API with the specified parameters:
startTime and endTime: Time range for the score history.
pageNumber: Page number for pagination.
pageSize: Number of items to display per page (set to 10).
Checks if the response contains rows.
If rows are present, calculates the total number of pages (totalPages) based on the total records in the response and sets the page count using setPageCount.
Updates the state variable points with the rows from the response.
Sets isData to true.
Closes the loader.
If rows are not present, sets isData to false, sets the page count to 0, and closes the loader.

-API Request
Method: POST
Endpoint: /userCenter/redpacket/getUserRedPacketRecordPage.do
Request Parameters:
startTime (String): Start time for score history data.
endTime (String): End time for score history data.
pageNumber (Number): Page number for pagination.
pageSize (Number): Number of items to display per page (set to 10).
Request Headers:
Content-Type (String): "application/x-www-form-urlencoded;charset=UTF-8"
X-Requested-With (String): "XMLHttpRequest"

-API Response
The API response is expected to contain information about the score history, with rows representing the score history data. If the response does not contain rows, the rows property may be empty.

15. Invite Overview 2
-The getsharData function retrieves share-related data from the /userCenter/inviteOverview2.do API. It updates state variables related to content information and promotional information based on the received data.
-Function Logic
Makes a GET request to the /userCenter/inviteOverview2.do API.
Updates state variables with data from the response:
Updates contentInfo with information such as todayInviteRebate, todayDepositNum, todayDepositBackBonus, and todayInvitePerson.
Updates promInfo with information such as linkUrl and code.

-API Request
Method: GET
Endpoint: /userCenter/inviteOverview2.do

-API Response
The API response is expected to contain information about share-related data, including content and prompInfo. The structure of the response is assumed to have properties such as todayInviteRebate, todayDepositNum, todayDepositBackBonus, todayInvitePerson, linkUrl, and code.

16. Bank Add Save
-Purpose
The subs function handles the submission of bank-related data, specifically adding or saving bank information. It prevents the default form submission, retrieves user input, creates a URLSearchParams object, and makes a POST request to the /userCenter/userBank/bankAddSave.do API.

-Function Logic
Prevents the default form submission using e.preventDefault().
Retrieves user input from HTML elements with the ids "bank" and "bankContent".
Creates a URLSearchParams object (formData) to send data in the form of key-value pairs.
Appends parameters such as "bankCode" and "cardNo" to the formData object.
Makes a POST request to the /userCenter/userBank/bankAddSave.do API with the formData object.
Logs the response data to the console.

-API Request
Method: POST
Endpoint: /userCenter/userBank/bankAddSave.do
Request Parameters:
bankCode (String): The bank code parameter.
cardNo (String): The card number parameter.
Request Headers:
Content-Type (String): "application/x-www-form-urlencoded; charset=UTF-8".

17. Invite Bonus
-Purpose
The getBetHistory function retrieves invite bonus history data from the /userCenter/inviteBonus.do API. It uses parameters such as start time, end time, page size, and page number to filter and paginate the results. The retrieved data is then used to update state variables, manage loading status, and determine pagination.

-Function Logic
Makes a GET request to the /userCenter/inviteBonus.do API using axios.
Includes parameters in the request URL for filtering and pagination: startTime, endTime, pageSize, and pageNumber.
Specifies the request headers with "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8".
Checks if the response contains bonus history data (response.data.content).
If data is present, calculates the total number of pages (totalPages) based on the total records in the response and sets the page count using setPageCount.
Updates the state variable bonusInfo with the content from the response.
Sets isData to true.
If no data is present, sets isData to false.

-API Request
Method: GET
Endpoint: /userCenter/inviteBonus.do
Request Parameters:
startTime (String): Start time for filtering.
endTime (String): End time for filtering.
pageSize (String): Number of items to display per page (set to "10").
pageNumber (Number): Page number for pagination.
Request Headers:
Content-Type (String): "application/x-www-form-urlencoded;charset=UTF-8"

-API Response
The API response is expected to contain information about the invite bonus history, specifically under the content property.

18. Score Exchange
-Purpose
The getBalance function retrieves user balance and score exchange information from the /userCenter/getScoreExchangeInfo.do API. The obtained data is used to update user balance, score-related details, and the available exchange options.

-Function Logic
Makes a POST request to the /userCenter/getScoreExchangeInfo.do API using axios.
Retrieves data from the response, specifically money, score, moneyToScore, scoreToMoney.
Logs the user's money balance to the console.
Updates the state variables:
Updates userBalance with the new money and score values.
Sets the selected exchange option (way) to the ID of moneyToScore.
Updates state variables mtoS and stoM with the details of money-to-score and score-to-money exchange options.

-API Request
Method: POST
Endpoint: /userCenter/getScoreExchangeInfo.do

-API Response
The API response is expected to contain information about the user's balance, including money, score, moneyToScore, and scoreToMoney.

19. Confirm Exchange
-Purpose
The exchangePoints function performs a points exchange by making a POST request to the /userCenter/confirmExchange.do API. It includes parameters such as exchangeNum (exchange amount) and configId (selected exchange option). The function handles the response, updating relevant state variables, and displaying success or error notifications.

-Function Logic
Makes a POST request to the /userCenter/confirmExchange.do API using axios.
Includes parameters:
exchangeNum: The amount of points to exchange.
configId: The ID of the selected exchange option (selectedtWay).
Specifies the request headers with "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" and 'X-Requested-With': 'XMLHttpRequest'.
Checks the success status of the response.
If the exchange is successful:
Resets the amount of exchange (setAmountofExchange(0)).
Resets the exchange amount (setExmamount(0)).
Calls the search function from props.
Closes the modal (props.closeModal()).
Displays a success notification.
If the exchange is unsuccessful, displays an error notification.

-API Request
Method: POST
Endpoint: /userCenter/confirmExchange.do
Request Parameters:
exchangeNum (Number): The amount of points to exchange.
configId (Number): The ID of the selected exchange option.

-API Response
The API response is checked for the success status. If successful, it triggers the reset of relevant state variables and calls specific functions. If unsuccessful, it displays an error notification.

20. Score Data
-The getScoreHistory function retrieves score history data from the /userCenter/scoreHisData.do API. It uses parameters such as start time, end time, page number, and type to filter and paginate the results. The retrieved data is then used to update state variables, manage loading status, and determine pagination.

-Function Logic
Makes a POST request to the /userCenter/scoreHisData.do API using axios.
Includes parameters in the request body for filtering and pagination: startTime, endTime, pageNumber, and type.
Specifies the request headers with "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" and 'X-Requested-With': 'XMLHttpRequest'.
Checks if the response contains score history data (response.data.rows).
If data is present, calculates the total number of pages (totalPages) based on the total records in the response and sets the page count using setPageCount.
Updates the state variable points with the content from the response.
Sets isData to true.
If no data is present, sets isData to false.

-API Request
Method: POST
Endpoint: /userCenter/scoreHisData.do
Request Body:
startTime (String): Start time for filtering.
endTime (String): End time for filtering.
pageNumber (Number): Page number for pagination.
type (String): Type of score history data to retrieve.
Request Headers:
Content-Type (String): "application/x-www-form-urlencoded;charset=UTF-8"
'X-Requested-With': 'XMLHttpRequest'

-API Response
The API response is expected to contain information about the user's score history, specifically under the rows property.

21. Recommend Info
-Purpose
The getPromList function retrieves promotional information from the /userCenter/agentManage/recommendInfo.do API. It is used to populate the promotional list, updating state variables and managing the loading status.

-Function Logic
Sets the loading state to true using setOpenLoader(true).
Makes a GET request to the /userCenter/agentManage/recommendInfo.do API using axios.
Specifies the request headers with "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" and 'X-Requested-With': 'XMLHttpRequest'.
Updates the state variable promoList with the content from the response.
Sets the loading state to false using setOpenLoader(false).

-API Request
Method: GET
Endpoint: /userCenter/agentManage/recommendInfo.do
Request Headers:
Content-Type (String): "application/x-www-form-urlencoded; charset=UTF-8"
'X-Requested-With': 'XMLHttpRequest'

-API Response
The API response is expected to contain information about promotional recommendations.

22. Recommend List
-Purpose
The getPromOverview function fetches promotional overview data from the /userCenter/agentManage/recommendList.do API. It uses parameters such as the start date, username, and current page number to filter and paginate the results. The retrieved data is then used to update state variables, manage loading status, and determine pagination.

-Function Logic
Sets the loading state to true using setOpenLoader(true).
Makes a GET request to the /userCenter/agentManage/recommendList.do API using axios.
Includes parameters in the request query: date (start date), username, and currentPageNo.
Specifies the request headers with "Content-Type": "application/x-www-form-urlencoded" and 'X-Requested-With': 'XMLHttpRequest'.
Checks if the response contains promotional overview data (response.data.page.rows).
If data is present:
Clears the existing promoOverview state variable.
Updates promoOverview with the content from the response.
Updates overview with the content of response.data.page.rows.
Sets the total page count using setPageCount(response.data.page.totalPageCount).
Sets isData to true.
Sets the loading state to false.
If no data is present, sets isData to false and the loading state to false.

-API Request
Method: GET
Endpoint: /userCenter/agentManage/recommendList.do
Request Parameters:
date (String): Start date for filtering.
username (String): Username for additional filtering.
currentPageNo (Number): Current page number for pagination.
Request Headers:
Content-Type (String): "application/x-www-form-urlencoded"
'X-Requested-With': 'XMLHttpRequest'

-API Response
The API response is expected to contain information about the promotional overview, specifically under the page.rows property.

23. Account Bonus
-Purpose
The getActBonus function retrieves activity bonus data from the /userCenter/getActBonusPage.do API. It uses parameters such as the start time, end time, page size, and page number to filter and paginate the results. The function also handles success and error notifications based on the API response.

-Function Logic
Makes a POST request to the /userCenter/getActBonusPage.do API using axios.
Includes parameters in the request body: startTime, endTime, pageSize, pageNumber, and actBonusType.
Specifies the request headers with "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" and 'X-Requested-With': 'XMLHttpRequest'.
Checks if the response indicates success (response.data.success).
If successful, displays a success notification using ToastrPngk.
If not successful, displays an error notification using ToastrPngk.
Checks if the response contains activity bonus data (response.data.rows).
If data is present:
Clears the existing performance state variable.
Updates performance with the content from the response.
Sets the total page count using setPageCount(Math.ceil(response.data.total / 10)).
Sets isData to true.
Sets the loading state to false.
If no data is present, sets isData to false and the loading state to false.

-API Request
Method: POST
Endpoint: /userCenter/getActBonusPage.do
Request Body:
startTime (String): Start time for filtering.
endTime (String): End time for filtering.
pageSize (Number): Page size for pagination.
pageNumber (Number): Page number for pagination.
actBonusType (Number): Activity bonus type.
Request Headers:
Content-Type (String): "application/x-www-form-urlencoded; charset=UTF-8"
'X-Requested-With': 'XMLHttpRequest'

-API Response
The API response is expected to contain information about activity bonuses, specifically under the rows property.

24. Kickback Strategy
-Purpose
The getRebateData function retrieves kickback strategy data from the /userCenter/finance/getKickBackStrategy.do API. It makes a GET request to the specified endpoint, handling both successful and error scenarios

-Function Logic
Makes a GET request to the /userCenter/finance/getKickBackStrategy.do API using axios.
Specifies the request headers with 'Content-Type': 'application/x-www-form-urlencoded' and 'X-Requested-With': 'XMLHttpRequest'.
On successful response, updates the rebate state variable with the content from the response (setRebate(response.data)).
Handles errors gracefully, with the catch block being empty. You may consider adding error logging or handling based on your application's requirements.

-API Request
Method: GET
Endpoint: /userCenter/finance/getKickBackStrategy.do
Request Headers:
'Content-Type': 'application/x-www-form-urlencoded'
'X-Requested-With': 'XMLHttpRequest'

-API Response
The expected response from the API is assumed to contain kickback strategy data, and this data is stored in the rebate state variable.

25. Unlock Task
-Purpose
The unloCkuprize function is designed to initiate the unlocking of a prize or task. It sends a POST request to the /startUnlockTask.do API, providing the necessary parameters. The function handles the response, displaying success or error notifications accordingly.

-Function Logic
Makes a POST request to the /startUnlockTask.do API using axios.
Includes the taskId parameter in the request body.
Specifies the request headers with 'Content-Type': 'application/x-www-form-urlencoded' and 'X-Requested-With': 'XMLHttpRequest'.
Checks if the response indicates success (response.data.success).
If successful, displays a success notification using ToastrPngk and triggers the unlock function from the props.
If not successful, displays an error notification using ToastrPngk and triggers the unlock function from the props.
Handles any potential errors during the API request with a try-catch block. The catch block is currently empty; you may consider adding error logging or handling based on your application's requirements.

-API Request
Method: POST
Endpoint: /startUnlockTask.do
Request Body:
taskId (any): Identifier of the task or prize to unlock.
Request Headers:
'Content-Type': 'application/x-www-form-urlencoded'
'X-Requested-With': 'XMLHttpRequest'
.-API Response
The API response is expected to contain information about the success of the unlocking operation (response.data.success) and a corresponding message (response.data.msg).

26. Unlock Task
-Purpose
The getPromo function is responsible for fetching unlockable gift tasks from the /userCenter/getUnlockGiftTasks.do API. It performs a GET request to the specified endpoint, handling the API response to trigger appropriate actions, such as displaying notifications and updating user data.

-Function Logic
Makes a GET request to the /userCenter/getUnlockGiftTasks.do API using axios.
Specifies the request headers with 'X-Requested-With': 'XMLHttpRequest'.
Checks if the API response indicates success (response.data.success).
If successful, triggers a refetch of user data using getUserData.refetch().
Updates the state variable promosdet with the data from the response (setPromosdet(response.data)).
Displays a success notification using ToastrPngk.
If not successful, displays an error notification using ToastrPngk.

-API Request
Method: GET
Endpoint: /userCenter/getUnlockGiftTasks.do
Request Headers:
'X-Requested-With': 'XMLHttpRequest'

-API Response
The expected response from the API is assumed to contain information about unlockable gift tasks, including success status (response.data.success) and a corresponding message (response.data.msg).

26. Get Account Page
-Purpose
The getData function is responsible for fetching data related to activities from the /userCenter/report/getActPage.do API. It performs a POST request to the specified endpoint, handling the API response to update state variables, including activity records and summary data.

-Function Logic
Makes a POST request to the /userCenter/report/getActPage.do API using axios.
Specifies the request body parameters:
secType: Type of activity section.
startTime: Start time for filtering.
endTime: End time for filtering.
pageSize: Number of records per page (assumed to be 10).
pageNumber: Current page number.
Specifies the request headers with:
"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
'X-Requested-With': 'XMLHttpRequest'.
Checks if the API response contains records (response.data.rows).
If records exist, calculates the sum of the money property in the records.
Updates the state variables:
sum with the calculated sum of money.
records with the data from the response.
pageCount with the total number of pages.
isData to indicate the presence of data.
Closes the loader (setOpenLoader(false)).
If no records exist, sets isData to false, closes the loader, and sets the sum to 0.
Catches any errors during the API request and updates state variables accordingly.

-API Request
Method: POST
Endpoint: /userCenter/report/getActPage.do
Request Body Parameters:
secType: Type of activity section.
startTime: Start time for filtering.
endTime: End time for filtering.
pageSize: Number of records per page (assumed to be 10).
pageNumber: Current page number.
Request Headers:
"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
'X-Requested-With': 'XMLHttpRequest'.

-API Response
The expected response from the API is assumed to contain information about activity records, including the total sum of money, the actual records (response.data.rows), and total page count (response.data.total).

27. Register Save
-Purpose
Defines a function named register responsible for handling the registration of an agent. The function performs the following tasks:
Checks whether the entered password (pwd) matches the confirmed password (rpwd). If not, it displays an error message using ToastrPngk and exits the function.
Makes an asynchronous POST request to the "/userCenter/agentManage/registerSave.do" API endpoint using the Axios library.
Displays success or error messages based on the response received from the API.

Checks whether the entered password (pwd) matches the confirmed password (rpwd). If not, it displays an error message using ToastrPngk and exits the function.
Makes an asynchronous POST request to the "/userCenter/agentManage/registerSave.do" API endpoint using the Axios library.
Displays success or error messages based on the response received from the API.

-Function Parameters
e: Event object representing the registration form submission.

-Function Logic
Checks if the password (pwd) matches the confirmed password (rpwd). If not, displays an error message using ToastrPngk and exits the function.
Sends a POST request to the "/userCenter/agentManage/registerSave.do" API endpoint with the registration form data (formData).
Handles the API response:
If the response indicates success (success: true), displays a success message using ToastrPngk and resets the form data.
If the response indicates an error (success: false), displays an error message using ToastrPngk.

-API Request
Method: POST
Endpoint: /userCenter/agentManage/registerSave.do
Form Data
The function sends the registration form data (stored in the formData variable) as the request payload.

28. Validate Info 
-Purpose
Defines a function named validateInfo responsible for retrieving and validating various security-related information for a user. The function performs the following tasks:
Makes an asynchronous POST request to the "/userCenter/getSecurityInfo.do" API endpoint using the Axios library.
Updates the state variables (isRealName, isWithdrawPass, isPhone, isEmail, isLine, isFacebook) based on the security information retrieved from the API response.

Makes an asynchronous POST request to the "/userCenter/getSecurityInfo.do" API endpoint using the Axios library.
Updates the state variables (isRealName, isWithdrawPass, isPhone, isEmail, isLine, isFacebook) based on the security information retrieved from the API response.

-Function Logic
Sends a POST request to the "/userCenter/getSecurityInfo.do" API endpoint.
Handles the API response:
Updates the state variables (isRealName, isWithdrawPass, isPhone, isEmail, isLine, isFacebook) based on the user's security information.

-API Request
Method: POST
Endpoint: /userCenter/getSecurityInfo.do

29. Update Real name
-Purpose
defines a function named submitRealName, which is responsible for submitting a user's real name to the server. The function performs the following tasks:
Makes a POST request to the "/userCenter/updateRealName.do" API endpoint using the Axios library.
Sends the user's real name (realNameValue) as a parameter in the request payload.

-Handles the API response:
If the submission is successful (result.data.success == true), it triggers the validateInfo function to update the user's security information.
If the submission fails, it sets the alert content and opens an alert to inform the user about the error.

-Function Logic
Sends a POST request to the "/userCenter/updateRealName.do" API endpoint with the user's real name as a parameter.
Handles the API response:
If the submission is successful, it triggers the validateInfo function to update the user's security information.
If the submission fails, it sets the alert content and opens an alert to inform the user about the error.
Closes the submit modal if the submission is successful.

-API Request
Method: POST
Endpoint: /userCenter/updateRealName.do

-Parameters
realName: User's real name (extracted from the realNameValue variable).

30. User Modify 
-Purpose
defines a function named submitUpdateInfoPass, which is responsible for submitting a user's updated password information to the server.
Makes a POST request to the "/userCenter/userPwdModifySave.do" API endpoint using the Axios library.

-Sends the following parameters in the request payload:
oldPwd: User's old password.
newPwd: User's new password.
okPwd: Confirmation of the new password.
type: Type of password update (extracted from the updateType variable).

-Handles the API response:
If the submission is successful (result.data.success == true), it triggers the validateInfo function to update the user's security information.
If the submission fails, it sets the alert content and opens an alert to inform the user about the error.
Closes the relevant modals (setSubmitModalOpen, setWithdrawPassModal, setWithdrawUpdateModal, setLoginPassModal) if the submission is successful.

-Function Logic
Sends a POST request to the "/userCenter/userPwdModifySave.do" API endpoint with the user's password information as parameters.
Handles the API response:
If the submission is successful, it triggers the validateInfo function to update the user's security information.
If the submission fails, it sets the alert content and opens an alert to inform the user about the error.
Closes the relevant modals if the submission is successful.

-API Request
Method: POST
Endpoint: /userCenter/userPwdModifySave.do

-Parameters
oldPwd: User's old password.   
newPwd: User's new password.
okPwd: Confirmation of the new password.
type: Type of password update (extracted from the updateType variable).

31. Update Security 
-Purpose
defines a function named saveUserInfo, which is responsible for saving the user's updated contact information to the server.
Makes a POST request to the "/userCenter/updateSecurityInfo.do" API endpoint using the Axios library.
Sends the following parameters in the request payload:
newContact: Updated contact information (extracted from the info variable).
type: Type of contact information update (extracted from the infoType variable).

-Handles the API response:
If the submission is successful (result.data.success == true), it triggers the validateInfo function to update the user's security information.
If the submission fails, it sets the alert content and opens an alert to inform the user about the error.
Closes the relevant modals (setUserInfoPhoneModal1, setUserInfoPhoneModal2, setUserInfoPhoneModal3, setUserInfoPhoneModal4) if the submission is successful.

-Function Logic
Sends a POST request to the "/userCenter/updateSecurityInfo.do" API endpoint with the user's updated contact information as parameters.
Handles the API response:
If the submission is successful, it triggers the validateInfo function to update the user's security information.
If the submission fails, it sets the alert content and opens an alert to inform the user about the error.
Closes the relevant modals if the submission is successful.

-API Request
Method: POST
Endpoint: /userCenter/updateSecurityInfo.do

-Parameters
newContact: Updated contact information (extracted from the info variable).
type: Type of contact information update (extracted from the infoType variable).

32. FeedBack
-Purpose
Defines a function named sendFeedback, which is responsible for sending user feedback to the server. 
Makes a POST request to the "userCenter/advice/saveAdvice.do" API endpoint using the Axios library.
Sends the following parameters in the request payload:
sendType: Specifies the type of feedback being sent (set to 1).
content: Contains the feedback content (extracted from the feedbackContent.current.value).
load: A boolean value set to true.

-Handles the API response:
If the submission is successful (response.data.success == true), it clears the feedback content input and displays a success notification using ToastrPngk.
If the submission fails, it displays an error notification using ToastrPngk.
Catches and logs any errors that occur during the process.


-Function Logic
Sends a POST request to the "userCenter/advice/saveAdvice.do" API endpoint with the user's feedback as parameters.
Handles the API response:
If the submission is successful, it clears the feedback content input and displays a success notification.
If the submission fails, it displays an error notification.
Catches and logs any errors that occur during the process.

-API Request
Method: POST
Endpoint: /userCenter/advice/saveAdvice.do

-Parameters
sendType: Specifies the type of feedback being sent (set to 1).
content: Contains the feedback content (extracted from the feedbackContent.current.value).
load: A boolean value set to true.

33. Advice List
-Purpose
Defines a function named getFeedback, which is responsible for retrieving a list of user feedback from the server. 
Makes a POST request to the "userCenter/advice/adviceList.do" API endpoint using the Axios library.

-Sends the following parameters in the request payload:
startTime: Specifies the start date (extracted from the commonReducer.startDate).
endTime: Specifies the end date (extracted from the commonReducer.endDate).
status: Specifies the status of the feedback (extracted from the suggestionStatus).
pageNumber: Specifies the page number for pagination (extracted from the currentPage).

-Handles the API response:
Calculates the total number of pages based on the total number of feedback items.
If there are feedback items (response.data.rows != ''), it sets the feedback state, page count, and a flag indicating the presence of data (setFeedback, setPageCount, setIsData(true)).
If there are no feedback items, it sets the flag indicating the absence of data (setIsData(false)) and resets the page count (setPageCount(0)).
Catches and logs any errors that occur during the process.


-Function Logic
Sends a POST request to the "userCenter/advice/adviceList.do" API endpoint with parameters specifying the time range, feedback status, and pagination details.
Handles the API response:
If there are feedback items, it sets the feedback state, page count, and a flag indicating the presence of data.
If there are no feedback items, it sets the flag indicating the absence of data and resets the page count.
Catches and logs any errors that occur during the process.

-API Request
Method: POST
Endpoint: /userCenter/advice/adviceList.do

-Parameters
startTime: Specifies the start date.
endTime: Specifies the end date.
status: Specifies the status of the feedback.
pageNumber: Specifies the page number for pagination.

34. View FeedBack
-Purpose
Defines a function named replyFeedback, which is responsible for retrieving details about a specific user feedback and its associated replies.
Makes a GET request to the "userCenter/advice/viewAdvice.do" API endpoint using the Axios library.

-Sends the following parameters in the request:
adviceId: Specifies the ID of the feedback for which details are requested.

-Handles the API response:
Appends the details of the retrieved feedback (response.data.advcie) to the adviceContent state.
If there are advice replies (response.data.adviceList != ''), it sets the adviceReply state and a flag indicating the presence of replies (setAdviceReply, setIsReply(true)).
If there are no advice replies, it sets the flag indicating the absence of replies (setIsReply(false)).
Catches and logs any errors that occur during the process.

-Function Logic
Sends a GET request to the "userCenter/advice/viewAdvice.do" API endpoint with the adviceId parameter.
Handles the API response:
Appends the details of the retrieved feedback to the adviceContent state.
If there are advice replies, it sets the adviceReply state and a flag indicating the presence of replies.
If there are no advice replies, it sets the flag indicating the absence of replies.
Catches and logs any errors that occur during the process.

-API Request
Method: GET
Endpoint: /userCenter/advice/viewAdvice.do

-Parameters
adviceId: Specifies the ID of the feedback for which details are requested.

34. Update Device
-Purpose
Defines a function named replySend, which is responsible for submitting a reply to a user's feedback.
Makes a POST request to the "userCenter/advice/updateAdvice.do" API endpoint using the Axios library.

-Sends the following parameters in the request:
adviceId: Specifies the ID of the feedback to which the reply is being submitted.
content: Contains the content of the reply obtained from the replyFeedBacks ref.
status: Specifies the status of the reply (set to 1).
Handles the API response:
If the submission is successful (response.data.success == true), it clears the input field (replyFeedBacks.current.children[1].children[0].value) and displays a success notification.
If the submission fails, it displays an error notification.
Catches and logs any errors that occur during the process.

-Function Logic
Sends a POST request to the "userCenter/advice/updateAdvice.do" API endpoint with the specified parameters.
Handles the API response:
If the submission is successful, it clears the input field and displays a success notification.
If the submission fails, it displays an error notification.
Catches and logs any errors that occur during the process.

-API Request
Method: POST
Endpoint: /userCenter/advice/updateAdvice.do

-Parameters
adviceId: Specifies the ID of the feedback to which the reply is being submitted.
content: Contains the content of the reply obtained from the replyFeedBacks ref.
status: Specifies the status of the reply (set to 1).

35. Message List
-Purpose
Defines a function named getMessageList, which is responsible for retrieving a list of messages for a user.
Sends a GET request to the "/userCenter/msgManage/messageList.do" API endpoint with the specified parameters.
Handles the API response:
If the API call is unsuccessful, it sets isData to false and displays an error notification.
If the API call is successful and contains message rows, it sets notificationMessage and isData.
If the API call is successful but does not contain message rows, it sets isData to false.
Calculates the total number of pages (totalPages) based on the total number of messages in the response.

-Function Logic
Sends a GET request to the "/userCenter/msgManage/messageList.do" API endpoint with the specified parameters.
Handles the API response:
If the API call is unsuccessful, it sets isData to false and displays an error notification.
If the API call is successful and contains message rows, it sets notificationMessage and isData.
If the API call is successful but does not contain message rows, it sets isData to false.
Calculates the total number of pages (totalPages) based on the total number of messages in the response.

-API Request
Method: GET
Endpoint: /userCenter/msgManage/messageList.do

-Parameters
pageNumber: Specifies the page number of the message list to be retrieved.

36. Article List
-defines a function named getNotice, which is responsible for retrieving a list of articles or notices.
Makes a GET request to the "/userCenter/msgManage/articleList.do" API endpoint using the Axios library.
Sends the following parameter in the request:
pageNumber: Specifies the page number for pagination.
Handles the API response and updates the state variables accordingly.

-Function Logic
Sends a GET request to the "/userCenter/msgManage/articleList.do" API endpoint with the specified parameter.
Checks the success status of the API response.
If the API response indicates success and contains non-empty rows, updates the state variable notificationMessage and sets isData to true.
If the API response indicates failure or the rows are empty, sets isData to false.

-API Request
Method: GET
Endpoint: /userCenter/msgManage/articleList.do

-Parameters
pageNumber: Specifies the page number for pagination.

37. Read Message 
-Purpose
Defines a function named readMessage, which is responsible for marking a message as read. The function performs the following tasks:
Makes a POST request to the "/userCenter/msgManage/readMessage.do" API endpoint using the Axios library.
Sends the following parameters in the request:
sid: Specifies the sender ID of the message to be marked as read.
rid: Specifies the receive message ID of the message to be marked as read.
Handles the API response.

-Function Logic
Sends a POST request to the "/userCenter/msgManage/readMessage.do" API endpoint with the specified parameters.
No explicit handling of the API response is provided in the code snippet. You may want to add logic based on the response if needed.
API Request
Method: POST
Endpoint: /userCenter/msgManage/readMessage.do

-Parameters
sid: Specifies the sender ID of the message to be marked as read.
rid: Specifies the receive message ID of the message to be marked as read.

38. Award
-Purpose
Ddefines a function named turnMain, which is responsible for initiating a user turntable and receiving an award. 
Makes a GET request to the "/userTurnlate/award.do" API endpoint using the Axios library.
Sends the following parameter in the request:
activeId: Specifies the prize ID for the turntable.
Handles the API response and updates the UI accordingly.
If the response indicates success, initiates the turntable rotation animation with the received award index and name.
If the response indicates failure, displays an error message.


-Function Logic
Sends a GET request to the "/userTurnlate/award.do" API endpoint with the specified parameter (activeId).
Checks the success status of the API response.
If the API response indicates success and contains a valid index, initiates the turntable rotation animation, sets the received award name, and updates the button state.
If the API response indicates failure, displays an error message using ToastrPngk.

-API Request
Method: GET
Endpoint: /userTurnlate/award.do

-Parameters

39. VIP
-Purpose
Defines a function named getVip, which is responsible for fetching VIP information.
Sets the loading state to true to indicate that data is being fetched.
Makes a GET request to the "/getVips.do" API endpoint using the Axios library.
Handles the API response and updates the UI accordingly.
If the response indicates success, sets the fetched VIP data.
If the response indicates failure or an error occurs, sets the loading state to false.

-Function Logic
Sets the loading state to true to indicate the start of the data fetching process.
Sends a GET request to the "/getVips.do" API endpoint.
Checks the success status of the API response.
If the API response indicates success, sets the fetched VIP data.
If the API response indicates failure or an error occurs, sets the loading state to false.
Updates the loading state to false to indicate the end of the data fetching process.

-API Request
Method: GET
Endpoint: /getVips.do

40. Get Balance
-Purpose
Defines a function named getGameBalance, which is responsible for fetching the game balance for a specified platform.
Makes a POST request to the "/thirdTrans/getBalance.do" API endpoint using the Axios library.
Includes the platform information in the request payload.
Updates the state with the fetched balance.

-API Request
Method: POST
Endpoint: /thirdTrans/getBalance.do

-Request Payload
platform: The platform for which the balance is requested. The platform value is determined by either props.getBalance or the locally defined platform variable.

41. Exchange Page
-Purpose
Defines a function named getExInfo, which is responsible for fetching exchange page information using the Axios library. 
Makes a GET request to the "/userCenter/third/exchangePageInfo.do" API endpoint.
Handles the API response by setting the exchange information (exInfo) and the score based on the response data.

-Function Logic
Sends a GET request to the "/userCenter/third/exchangePageInfo.do" API endpoint.
Handles the API response by setting the exchange information (exInfo) and the score based on the response data.

-API Request
Method: GET
Endpoint: /userCenter/third/exchangePageInfo.do

-Response Handling
Sets the state variables exInfo and score based on the data received in the API response.

42. Transfer Points
-Purpose
The provided code snippet defines a function named transferPoints, which is responsible for transferring points/money between different game platforms using the Axios library. The function performs the following tasks:

Makes a POST request to the "/thirdTrans/thirdRealTransMoney.do" API endpoint.
Sends data including the target game platform (changeTo), source game platform (changeFrom), and the amount of money/points to transfer (money).
Handles the API response, displaying an error notification if the transfer is unsuccessful.
Function Logic
Sends a POST request to the "/thirdTrans/thirdRealTransMoney.do" API endpoint with the specified parameters.
Checks the response for success, displaying an error notification if the transfer is unsuccessful.

-API Request
Method: POST
Endpoint: /thirdTrans/thirdRealTransMoney.do

-Request Parameters
changeTo: The target game platform to which the transfer is made.
changeFrom: The source game platform from which the transfer is initiated.
money: The amount of money/points to transfer.

-Response Handling
Checks if the transfer was successful based on the response data.
Displays an error notification using the NotificationManager if the transfer is unsuccessful.

43. Sign In 
-Purpose
The useGetSignin function is a custom hook that fetches sign-in information using the useQuery hook.
It sends a GET request to the "/signIn.do" API endpoint.

Function Logic:
1. Utilizes the useQuery hook to fetch sign-in information.
2. Configures the queryKey, staleTime, and queryFn options for the useQuery hook.

API Request:
- Method: GET
- Endpoint: /signIn.do

Response Handling:
- Retrieves and returns the sign-in information.

@function useGetSignin
@returns {Object} The result of the useQuery hook containing sign-in information.
 /

/
Sign In Records Component

Purpose:
The SignInRecords component displays a list of sign-in records based on the fetched sign-in information.

Component Logic:
1. Uses the useGetSignin hook to fetch sign-in information.
2. Renders a rewards-main div containing sign-in record items.
3. Maps through the dayGiftConfig array to display individual sign-in record items.
4. Handles the onClick event for each sign-in record item, invoking the signInbonus function.

Component Structure:
- rewards-main: Container for displaying sign-in record items.
  - rewards-items: Individual sign-in record item.
    - img-light: Light effect for sign-in record item.
    - day-item: Display the day of the sign-in record.
    - img-coin: Image representing the sign-in bonus (money).
    - bonus-item-cash: Display the cash bonus for the sign-in record.
    - bonus-item-score: Display the score bonus for the sign-in record.

@component SignInRecords
 /

/
signInbonus Function

Purpose:
The signInbonus function is invoked when a user clicks on a sign-in record item.
It handles the logic related to the sign-in bonus, such as displaying additional information.

Function Logic:
1. Invoked when a user clicks on a sign-in record item.
2. Accepts parameters related to the sign-in record, such as signType, index, cash, and score.
3. Performs logic based on the sign-in record information.

@function signInbonus
@param {string} signType - The type of sign-in.
@param {number} index - The index of the sign-in record item.
@param {number} cash - The cash bonus for the sign-in record.
@param {number} score - The score bonus for the sign-in record.
 /

// Example Usage:
// const signInrecords = useGetSignin();
// <SignInRecords signInrecords={signInrecords} signInbonus={signInbonus} />

44. Get Signin Rules
  
  Purpose:
  The useGetSigninRules function is a custom hook that fetches sign-in rules using the useQuery hook.
  It sends a GET request to the "/getSignRuleConfig.do" API endpoint.
  
  Function Logic:
  1. Utilizes the useQuery hook to fetch sign-in rules.
  2. Configures the queryKey, enabled, staleTime, and queryFn options for the useQuery hook.
  
  API Request:
  - Method: GET
  - Endpoint: /getSignRuleConfig.do
  
  Response Handling:
  - Retrieves and returns the sign-in rules.
  
  @function useGetSigninRules
  @returns {Object} The result of the useQuery hook containing sign-in rules.
 

Example Usage:
const rules = useGetSigninRules();

  registerUser Function
  
  Purpose:
  The registerUser function is responsible for registering a user by making a POST request to the "/register.do" API endpoint.
  
  Function Logic:
  1. Accepts a payload containing user registration data.
  2. Sends a POST request to "/register.do" to register the user.
  3. Invalidates specific queries using the useQueryClient upon successful registration.
  4. Displays success or error notifications based on the API response.
  
  API Request:
  - Method: POST
  - Endpoint: /register.do
  - Request Payload: User registration data.
  
  @function registerUser
  @param {Object} payload - User registration data.
  @returns {Promise} A promise representing the registration process.
 


  useRegisterUser Function
  
  Purpose:
  The useRegisterUser function is a custom hook that uses the useMutation hook to handle user registration.
  It utilizes the registerUser function as the mutation function.
  
  Function Logic:
  1. Utilizes the useMutation hook with the mutationFn and onSuccess options.
  2. Calls the registerUser function to perform user registration.
  3. Invalidates specific queries upon successful registration.
  
  @function useRegisterUser
  @returns {Object} The result of the useMutation hook for user registration.
 

 Example Usage:
// const registerMutation = useRegisterUser();
// await registerMutation.mutate(payload);

45. State Management

/**
 * Cookies Library Import
 * 
 * Purpose:
 * Importing the "universal-cookie" library for handling cookies.
 * 
 * @library Cookies
 * @see https://www.npmjs.com/package/universal-cookie
 */

/**
 * Zustand Library Imports
 * 
 * Purpose:
 * Importing necessary functions from the "zustand" library for state management.
 * - create: Creates a new Zustand store.
 * - persist: Middleware for Zustand to persist state using local storage.
 * - devtools: Middleware for Zustand to enable the use of Redux DevTools.
 * - useShallow: Hook for creating a shallow copy of Zustand state.
 * 
 * @library Zustand
 * @see https://github.com/pmndrs/zustand
 */

/**
 * UserInfo Hook Import
 * 
 * Purpose:
 * Importing the "useStationConfig" hook from "../hooks/getUserInfoHook" for fetching user information.
 * 
 * @hook useStationConfig
 * @see "../hooks/getUserInfoHook"
 */

/**
 * LoginModalStatus State
 * 
 * Purpose:
 * Defines the state and methods related to the login modal.
 * - isOpen: Indicates whether the login modal is open.
 * - modalState: Method to set the login modal state to open.
 * 
 * @type {Object} LoginModalStatus
 * @property {boolean} isOpen - Indicates whether the login modal is open.
 * @property {Function} modalState - Method to set the login modal state to open.
 */
export const useLoginStore = create<LoginModalStatus>((set) => ({
  isOpen: false,
  modalState: () => {
    set({ isOpen: true });
  },
}));

/**
 * RegModalStatus State
 * 
 * Purpose:
 * Defines the state and methods related to the registration modal.
 * - isOpenRegister: Indicates whether the registration modal is open.
 * - regFields: An array containing registration fields.
 * - RegmodalState: Method to set the registration modal state to open.
 * 
 * @type {Object} RegModalStatus
 * @property {boolean} isOpenRegister - Indicates whether the registration modal is open.
 * @property {Array} regFields - An array containing registration fields.
 * @property {Function} RegmodalState - Method to set the registration modal state to open.
 */
export const userRegstore = create<RegModalStatus>((set) => ({
  isOpenRegister: false,
  regFields: [],
  RegmodalState: () => {
    set({ isOpenRegister: true });
  },
}));

/**
 * SignInState State
 * 
 * Purpose:
 * Defines the state related to the sign-in form.
 * - userName: The user's username for sign-in.
 * - password: The user's password for sign-in.
 * - rememberMe: Indicates whether to remember the user.
 * 
 * @type {Object} SignInState
 * @property {string} userName - The user's username for sign-in.
 * @property {string} password - The user's password for sign-in.
 * @property {boolean} rememberMe - Indicates whether to remember the user.
 */
type SignInState = {
  userName: string;
  password: string;
  rememberMe: boolean;
};

export const useSignInStore = create<SignInState>()(
  devtools(
    persist(
      (set) => ({
        userName: "",
        password: "",
        rememberMe: false,
      }),
      {
        name: "signIn",
      }
    )
  )
);

/**
 * OTPstate State
 * 
 * Purpose:
 * Defines the state and methods related to the OTP (One-Time Password) generation.
 * - otp: The OTP URL with a timestamp for refreshing.
 * - setOtp: Method to refresh the OTP URL.
 * 
 * @type {Object} OTPstate
 * @property {string} otp - The OTP URL with a timestamp for refreshing.
 * @property {Function} setOtp - Method to refresh the OTP URL.
 */
type OTPstate = {
  otp: any;
  setOtp: () => void;
};

/**
 * useGenerateOTP Store
 * 
 * Purpose:
 * Creates a Zustand store for OTP generation in the sign-in process.
 * 
 * @type {Function} useGenerateOTP
 * @returns {Object} The Zustand store for OTP generation in the sign-in process.
 */
export const useGenerateOTP = create<OTPstate>()((set) => ({
  otp: "/loginVerifycode.do?timestamp=" + Date.now(),
  setOtp: () => {
    set({ otp: "/loginVerifycode.do?timestamp=" + Date.now() });
  },
}));

/**
 * useGenerateOTPRegister Store
 * 
 * Purpose:
 * Creates a Zustand store for OTP generation in the registration process.
 * 
 * @type {Function} useGenerateOTPRegister
 * @returns {Object} The Zustand store for OTP generation in the registration process.
 */
export const useGenerateOTPRegister = create<OTP

46. /**
 * Change Language Function
 * 
 * Purpose:
 * The provided function, changeLanguage, is responsible for changing the language and making a request to update the language on the server.
 * 
 * @function changeLanguage
 * @param {Object} payload - The payload containing the language information.
 * @param {string} payload.lang - The language code to switch to.
 * @returns {Promise} A Promise that resolves when the language is successfully changed.
 * 
 * @throws Will throw an error if the language change request fails.
 * 
 * @example
 * // Change language to English
 * changeLanguage({ lang: 'en' })
 *   .then(() => {
 *      console.log('Language changed successfully');
 *   })
 *   .catch((error) => {
 *      console.error('Error changing language:', error);
 *   });
 */
const changeLanguage = (payload: any) => {
    // Change the language using i18next library
    i18next.changeLanguage(payload.lang);
    
    // Make a request to update the language on the server
    return axiosGet("/changeLanguage.do", payload);
};


47. /**
 * Get Agent Promotion Information Hook
 * 
 * Purpose:
 * The provided hook, useGetAgentPromoInfo, is responsible for fetching agent promotion information.
 * 
 * @function useGetAgentPromoInfo
 * @returns {Object} The result of the query, including data, error, isLoading, and refetch function.
 * 
 * @example
 * // Usage in a component
 * const { data, error, isLoading, refetch } = useGetAgentPromoInfo();
 * 
 * if (isLoading) {
 *    // Display loading indicator
 *    return <Loader />;
 * }
 * 
 * if (error) {
 *    // Handle error
 *    return <ErrorMessage error={error} />;
 * }
 * 
 * // Use data to render component
 * console.log(data);
 * 
 * // Manually trigger a refetch if needed
 * refetch();
 */
export const useGetAgentPromoInfo = () => {
    return useQuery({
        queryKey: ["agentPromoInformation"],
        staleTime: 0,
        queryFn: async () => (await axiosPost2("/userCenter/agentManage/agentRegPromotionInfo.do"))
    });
};

