declare var window: Window & typeof globalThis;
declare var document: Document;

function selectUnreadEmails(link) {
  if (/^https:\/\/poczta\.interia\.pl.*/.test(link)) {
    for (const row of document.querySelectorAll("tr.ch")) {
      (row.children[0].children[0] as HTMLElement).click();
    }
  } else if (/^https?:\/\/poczta\.onet\.pl.*/.test(link)) {
    for (const checkbox of document.querySelectorAll('.single-mail-row.unread .checklist')) {
      (checkbox as HTMLElement).click();
    }
  } else if (/^https?:\/\/poczta\.wp\.pl.*/.test(link)) {
    for (const checkbox of document.querySelectorAll('div.StreamItem div.stream-item__wrap.is-unread .Checkbox')) {
      (checkbox as HTMLElement).click();
    }
  } else {
    alert("Nie znana poczta")
  }
}
