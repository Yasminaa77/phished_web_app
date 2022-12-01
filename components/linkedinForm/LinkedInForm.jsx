import { Button, createStyles, TextInput, Textarea } from '@mantine/core';
import styled from 'styled-components';
import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Notification } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons';
// import Calendar from '../datetimepicker/Calendar';


const Container = styled.div`
  .button {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
  }
`;

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
  },

  input: {
    height: 'auto',
    paddingTop: 16,
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1,
  },
}));

const textAreaStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
  },

  input: {
    height: 'auto',
    paddingTop: 16,
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1,
  },
}));


const templateStyle ={
  marginTop: 20,
  padding: 20,
  backgroundColor: '#D4EBFF',
  border: '1px dashed #50A7F2',
  borderRadius: '5px',
  color: '#3F3F3F',
  fontSize: '10px',


}

export function LinkedInForm({ submitHandler, onScheduleEmail }) {
  // Styles
  const { classes } = useStyles();
  const { textarea } = textAreaStyles();

  // Inputs
  const [subject, setSubject] = useState('Two-Factor Authentication ');
  const [fromEmail, setFromEmail] = useState('phishedapp@gmail.com');
  const [to, setTo] = useState('');
  const [html, setHtml] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [bodyName, setBodyName] = useState('');
  const [template, setTemplate] = useState('linkedin');
  const [submissionNote, setSubmissionNote] = useState("invisable");




  async function onClick(e) {
    e.preventDefault();

    setTo('');
    setFname('');
    setLname('');
    setHtml('');
    setBodyName('');

    let from = `${fname} ${lname} ${fromEmail}`;
    let validation = await submitHandler({ from, to, subject, html,bodyName, template})
    
    setSubmissionNote(validation.toString())
    const timeId = setTimeout(() => {
      setSubmissionNote("invisable");
      }, 4500);
    return () => clearTimeout(timeId);

  }
  

  return (
      // <Container>

      <>
        <div style={templateStyle} >

          <p>Hi [targetName] ,please confirm your email address to get full access to LinkedIn.</p>
          <p>380567</p>
          <p>Enter this code or click the button below.</p>
          <p>Your privacy is important</p>
          <p>We may send you member updates, recruiter messages, job suggestions, invitations, reminders, and promotional messages from us and our partners. You can change your preferences anytime.</p>
          <p><u>Agree & Authorize your email</u></p>
        </div>

        
        <form onSubmit={onClick} style={{marginTop: 20}} >

          <TextInput
              label="First Name"
              placeholder="Jane"
              classnames={classes}
              mb={12}
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              required
          />
          <TextInput
              label="Last Name"
              placeholder="Doe"
              classnames={classes}
              mb={12}
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              required
          />

          <TextInput
              label="Receiver Email"
              placeholder="receivers.email@gmail.com"
              classnames={classes}
              mb={12}
              value={to}
              onChange={(e) => setTo(e.target.value)}
              type="email"
              required
          />
          <TextInput
              label="Target Name"
              placeholder="Sam"
              classnames={classes}
              mb={12}
              value={bodyName}
              onChange={(e) => setBodyName(e.target.value)}
              required
          />



          <div className="button">
            <Button type="submit" variant="outline">
              Send email
            </Button>

            <Link href="/scheduleEmail" passHref>
              <a
                  onClick={() =>
                    onScheduleEmail({ fname, lname, fromEmail, to, subject, html, template, bodyName })
                  }
              >
                <Button variant="subtle">Schedule email for later</Button>
              </a>
            </Link>
          </div>
        </form>

        {submissionNote=="true" &&
        <Notification icon={<IconCheck size={18} />} color="teal" title=" Email Submitted">
          It may take a few minutes before the email is delivered.
        </Notification>
        }

        {submissionNote=="false" &&
        <Notification icon={<IconX size={18} />} color="red" title="Consent Needed">
          The person you are trying to phish has not consented to receiving our phishing emails yet. <u><a href={"#"}>Learn more</a></u>
        </Notification>
        }

      </>

  );
}

export default LinkedInForm;
