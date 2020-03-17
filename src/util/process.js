function exit() {
  console.log('\n  Bye friendly human, until next time 👋\n');
  console.log('  If you need support or have feedback,');
  console.log('  you are always welcome to send an email to:\n');
  console.log('  support@baseline.dev\n');
  process.exit();
}

function exitRequestInvite() {
  console.log(`\n  Woups, something didn't work as expected 😅\n`);
  console.log('  It seems like you don\'t have an invite for Baseline yet.');
  console.log('  Please head over to https://baseline.dev and request an invite.');
  console.log('  You can also send an email to:\n');
  console.log('  support@baseline.dev\n');
  process.exit();
}

export {
  exit,
  exitRequestInvite
};
