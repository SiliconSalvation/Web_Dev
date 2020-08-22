const express = require('express');

const app = express();
const bodyParser = require('body-parser');
app.use(express.static('static'));
app.use(bodyParser.json());

const issues = [
  {
    id: 1, status: 'Open', owner: 'Ravan',
    created: new Date('2016-08-15'), effort: 5, completionDate: undefined,
    title: 'Error in console when clicking Add',
  },
  {
    id: 2, status: 'Assigned', owner: 'Eddie',
    created: new Date('2016-08-16'), effort: 14,
    completionDate: new Date('2016-08-30'),
    title: 'Missing bottom border on panel',
  },
  {
    id: 3, status: 'Closed', owner: 'Bob',
    created: new Date('2016-07-23'), effort: 5,
    completionDate: new Date('2016-07-30'),
    title: 'Change Header to appropriate text',
  },
];

const validIssueStatus = {
  New: true,
  Open: true,
  Assigned: true,
  Fixed: true,
  Verified: true,
  Closed: true,
};

const issueFieldType = {
  id: 'required',
  status: 'required',
  owner: 'required',
  effort: 'optional',
  created: 'required',
  completionDate: 'optional',
  title: 'required',
};

function validateIssue(issue) {
  for (const field in issueFieldType) {
    const type = issueFieldType[field];
    if (!type) {
      delete issue[field];
    } else if (type === 'required' && !issue[field]) {
      return `${field} is required.`;
    }
  }

  if (!validIssueStatus[issue.status]) {
    return `${issue.status} is not a valid status.`;
  }
  return null;
}

app.get('/api/issues', (req, res) => {
  const metadata = { total_count: issues.length };
  res.json({ _metadata: metadata, records: issues});
});

app.post('/api/issues', (req, res) => {
  const newIssue = req.body;
  newIssue.id = issues.length + 1;
  newIssue.created = new Date();
  if(!newIssue.status) {
    newIssue.status = 'New';
  }
  const err = validateIssue(newIssue)
  if (err) {
    res.status(422).json({ message: `Invalid request: ${err}` });
    return;
  }
  issues.push(newIssue);

  res.json(newIssue);
    
});

app.get('/favicon.ico', (req, res) => {
  res.sendFile('favicon.ico', { root: '.' });
});

app.listen(4000, () => {
  console.log('App started on port 4000');
});