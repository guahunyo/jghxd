$(function () {
  const in_tab = document.getElementsByClassName('in')[0];
  in_tab.hidden = true;
});

$('.switch').click(e => {
	const doms = document.getElementsByClassName('switch');
  const dom = doms[0];
  console.log('doms', doms);
  const out_tab = document.getElementsByClassName('out')[0];
  const in_tab = document.getElementsByClassName('in')[0];
  if (dom.innerText === '表') {
    dom.innerText = '里';
    out_tab.hidden = true;
    in_tab.hidden = false;
  } else {
    dom.innerText = '表';
    out_tab.hidden = false;
    in_tab.hidden = true;
  }
});