import Imap from "imap";
import { simpleParser } from "mailparser";

export class NodeImap {
  private imap: Imap;
  private readonly config: Imap.Config;

  constructor(config: Imap.Config) {
    this.config = config;
    this.imap = new Imap(config);
  }

  public async connect() {
    return new Promise((resolve, reject) => {
      this.imap.once("ready", () => {
        resolve(void 0);
      });
      this.imap.once("error", (err: any) => {
        reject(err);
      });
      this.imap.connect();
    });
  }

  public async getUnreadEmails() {
    return new Promise((resolve, reject) => {
      this.imap.openBox("INBOX", true, (err, box) => {
        if (err) return reject(err);

        this.imap.search(["UNSEEN", ["SINCE", new Date()]], (err, results) => {
          if (err) return reject(err);

          if (!results || !results.length) {
            return resolve([]);
          }

          const f = this.imap.fetch(results, { bodies: "" });
          const emails: any[] = [];

          f.on("message", (msg, seqno) => {
            msg.on("body", (stream, info) => {
              // @ts-ignore
              simpleParser(stream, {}, (err, parsed) => {
                if (err) return reject(err);
                emails.push(parsed);
              });
            });
          });

          f.once("error", (err: any) => {
            reject(err);
          });

          f.once("end", () => {
            resolve(emails);
            this.imap.end();
          });
        });
      });
    });
  }

  public async searchEmails(query: string) {
    return new Promise((resolve, reject) => {
      this.imap.openBox("INBOX", true, (err, box) => {
        if (err) return reject(err);

        this.imap.search([["TEXT", query]], (err, results) => {
          if (err) return reject(err);

          if (!results || !results.length) {
            return resolve([]);
          }

          const f = this.imap.fetch(results, { bodies: "" });
          const emails: any[] = [];

          f.on("message", (msg, seqno) => {
            msg.on("body", (stream, info) => {
              // @ts-ignore
              simpleParser(stream, {}, (err, parsed) => {
                if (err) return reject(err);
                emails.push(parsed);
              });
            });
          });

          f.once("error", (err: any) => {
            reject(err);
          });

          f.once("end", () => {
            resolve(emails);
            this.imap.end();
          });
        });
      });
    });
  }
}
