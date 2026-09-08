# Can AI take a McDonald's drive-through order?

Innovation Frontier mini-case #1. Technology, ethics, and action.

McDonald's tested voice AI in drive-through lanes, then pulled the IBM system in 2024. The company still plans to use voice ordering. You are advising U.S. leadership on the next operating model.

## The decision

Choose one path:

- Let AI take most drive-through orders.
- Pair AI with employees at the speaker.
- Keep employees on the conversation and use AI as support.
- Put AI in kitchen and planning work instead of in front of customers.

Your job is to pick a model and a rule for when to expand it, pause it, or stop it.

## What the system has to do

AI here means software that hears speech, maps it to the menu, and talks back. In a drive-through lane that software has to:

1. Convert speech to text.
2. Match the request to items and prices.
3. Ask when the request is unclear.
4. Write the order into the restaurant system.
5. Answer the customer in real time.

The menu is finite, volume is high, and results are measurable. That combination makes automation look attractive. Listening is still hard.

Customers speak with different accents and dialects. Children talk from the back seat. Engines and traffic fill the microphone. People change their minds, ask for substitutions, stack coupons, and expect a wrong item to be fixed on the spot. A bad ticket at the speaker becomes a kitchen order, a payment, a wait, wasted food, and an angry customer.

## What McDonald's already tried

McDonald's worked with IBM from 2021 on Automated Order Taking in drive-through lanes. The pilot grew to more than 100 U.S. restaurants. Leadership wanted consistent order-taking, less pressure on crew, and more time for cooking and service. It also wanted more cars through the lane in peak hours, and proof that test-set accuracy showed up as restaurant results.

Results were mixed. Customer videos showed wrong quantities and extra items. Reported cases included very large chicken-nugget orders and ice cream with ketchup or butter. The clips spread because the errors were public and extreme. They also showed a real operations problem. Average accuracy can look acceptable while a few severe mistakes still damage trust and stall the line. The system also had to know when it was unsure and hand the conversation to a person.

In June 2024 McDonald's said it would end the IBM pilot and remove the system from those restaurants by July. The company did not treat voice ordering as finished. It said the test informed its evaluation and that voice ordering would still become part of restaurants. In December 2023 McDonald's had already announced a multiyear partnership with Google Cloud to apply cloud and generative AI across the global restaurant system. Ending the IBM test changed the approach. The AI program continued.

## Why accuracy is the wrong single score

A pass-or-fail call on order accuracy ignores the rest of the restaurant.

If AI saves thirty seconds at the speaker and then creates corrections at the window or in the kitchen, total service time gets worse.

The economics also vary by site. Labor supply, wages, customer mix, menu complexity, and lane volume differ across a franchised network. A model that pays off in one restaurant can lose money in another.

Customers may judge a machine error more harshly than a human error. That reaction is stronger when they cannot reach an employee.

The workforce effect is mixed. AI may cut order-taking hours. It may also reduce load on the remaining job if people shift to cooking, hospitality, and exception handling. McDonald's still has to decide how much choice franchisees get. Someone has to be accountable when the system charges the wrong amount, misses an allergen, or works worse for some accents and dialects than for others.

## Four operating models

**AI-first ordering.** The system takes most drive-through orders. Employees step in only for flagged exceptions. A customer-facing error hits payment, kitchen flow, and brand trust at once.

**Human-AI hybrid.** AI runs the conversation. An employee watches several lanes and can take over at once. Handoffs can feel awkward. Labor savings depend on how often that employee has to jump in.

**Employee-led, AI-assisted.** The employee keeps the conversation. AI transcribes, suggests items, checks the ticket, and enters the order. Automation savings are smaller. The employee may get distracted or trust a bad suggestion.

**Back-of-house AI.** Put the work into demand forecasting, staffing, inventory, equipment maintenance, and order checks. Customers are less exposed. Order-taking labor and speed move less.

## How to judge the choice

Judge each model on customer results, restaurant operations, money, fairness, and whether it can scale.

Customer results include order accuracy, satisfaction, accessibility, perceived wait, and whether a customer can reach an employee.

Restaurant operations include cars served per hour, total service time, remakes, food waste, bottlenecks, and crew workload. Speaker time alone is not enough.

Economics include technology and integration cost, labor hours saved, sales from better suggestions, and the cost of failures.

Fairness and risk include performance by accent, dialect, language, age, and disability. They also include privacy of recorded speech, wrong charges, and allergen errors.

Scale includes menu changes, franchisee adoption, employee training, system reliability, and performance across restaurant formats.

A national switch is the wrong first move. Staged tests against matched control restaurants are how the company learns. Set thresholds for accuracy, speed, complaints, and how often a person has to take over. Give the conversation to a person at once when any of these show up:

- a high-risk request
- a low-confidence interpretation
- an accessibility need
- an allergen
- a payment dispute
- a repeated correction

Review outcomes by customer group and restaurant type. Network-wide averages hide those differences.

## Discussion questions

1. Which operating model should McDonald's choose, and what is your decision rule?
2. What order accuracy is enough to deploy? Does AI have to beat human cashiers?
3. Which metric can improve while the overall customer experience gets worse?
4. Who should bear the cost of an AI mistake: McDonald's, the franchisee, the technology provider, or the customer?

## Sources

- Associated Press, "McDonald's is ending its test run of AI-powered drive-thrus with IBM," June 17, 2024.
- Restaurant Dive, "McDonald's ends IBM drive-thru voice order test," June 17, 2024.
- McDonald's Corporation, "McDonald's and Google Cloud Announce Strategic Partnership," December 6, 2023.
- NIST, *Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile*, NIST AI 600-1, July 2024.
