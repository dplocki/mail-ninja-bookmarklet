declare var window: Window & typeof globalThis;
declare var document: Document;

interface IEmail {
  title: string,
  selector: HTMLElement
}

type EmailReaderFunction = (document: Document) => IEmail[];

function getInteriaEmails(document: Document): IEmail[] {
  return Array.from(document.getElementsByClassName('msglist-item'))
    .filter((item: Element) => !Array.from(item.classList).includes('msglist-item--seen'))
    .map<IEmail>((item: Element) => ({
      title: '',
      selector: item.getElementsByTagName('label')[0] as HTMLElement
    }));
}

function getOnetEmails(document: Document): IEmail[] {
  return Array.from(document.querySelectorAll('.single-mail-row.unread .checklist'))
    .map<IEmail>((item: Element) => ({
      title: '',
      selector: item as HTMLElement
    }));
}

function getWpEmails(document: Document): IEmail[] {
  return Array.from(document.querySelectorAll('div.StreamItem div.stream-item__wrap.is-unread .Checkbox'))
    .map<IEmail>((item: Element) => ({
      title: '',
      selector: item as HTMLElement
    }));
}

function selectUnreadEmails(document: Document, link: string): void {
  const cases: { [key: string]: EmailReaderFunction; } = {
    'https:\/\/poczta\.interia\.pl': getInteriaEmails,
    'https:\/\/poczta\.onet\.pl': getOnetEmails,
    'https:\/\/poczta\.wp\.pl': getWpEmails
  }

  const matchingEmail: string | undefined = Object.keys(cases).find(emailLink => (new RegExp(`^${emailLink}.*`)).test(link));
  if (!matchingEmail) {
    alert("Nie znana poczta");
    return;
  }

  for (const item of cases[matchingEmail](document)) {
    item.selector.click();
  }
}

selectUnreadEmails(document, location.href);
