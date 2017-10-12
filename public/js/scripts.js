const postInfo = () => {
  console.log('fired')
}

$('#POST-email').keydown(e => e.keyCode === 13 ? postInfo() : null);
