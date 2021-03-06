import m from "mithril";
import marked from "marked";
import { ifElse, path } from "ramda";

import { T, mlink, profileLink } from "../util";

const isAuthor = username => article => article.author.username === username;

const authorMeta = article => [
  m("a.btn.btn-outline-secondary.btn-sm[href='/editor/" + article.slug + "']", mlink(),
    m("i.ion-edit"),
    " Edit Article"
  ),
  m("button.btn.btn-outline-danger.btn-sm",
    m("i.ion-trash-a"),
    " Delete Article"
  )
];

const nonAuthorMeta = article => [
  m("button.btn.btn-sm.btn-outline-secondary",
    m("i.ion-plus-round"),
    m.trust("&nbsp;"),
    "Follow " + article.author.username
  ),
  m.trust("&nbsp;&nbsp;"),
  m("button.btn.btn-sm.btn-outline-primary",
    m("i.ion-heart"),
    m.trust("&nbsp;"),
    "Favorite Post ",
    m("span.counter", "(" + article.favoritesCount + ")")
  )
];

const articleMeta = (article, username) =>
  m(".article-meta",
    m("a", profileLink(article.author.username), m("img", { src: article.author.image })),
    m(".info",
      m("a.author", profileLink(article.author.username), article.author.username),
      m("span.date", new Date(article.createdAt).toDateString())
    ),
    //ifElse(isAuthor(username), authorMeta, nonAuthorMeta)(article)
    T(article, ifElse(isAuthor(username), authorMeta, nonAuthorMeta))
  );

export const createView = actions => model => {
  const article = model.article;
  const username = path(["user", "username"], model);

  return m(".article-page",
    m(".banner",
      m(".container",
        m("h1", article.title),
        articleMeta(article, username)
      )
    ),
    m(".container page",
      m(".row.article-content",
        m(".col-md-12",
          m("h2", article.description),
          m(".tag-list",
            article.tagList.map(tag => m("span.tag-pill.tag-default", tag))
          ),
          m("p", m.trust(marked(article.body, { sanitize: true })))
        )
      ),
      m("hr"),
      m(".article-actions",
        articleMeta(article, username)
      ),
      m(".row",
        m(".col-xs-12.col-md-8.offset-md-2",
          m("form.card.comment-form",
            m(".card-block",
              m("textarea.form-control", { placeholder: "Write a comment...", rows: "3",
                oninput: actions.updateCommentField, value: model.comment })
            ),
            m(".card-footer",
              m("img.comment-author-img", { src: "http://i.imgur.com/Qr71crq.jpg" }),
              m("button.btn.btn-sm.btn-primary",
              { onclick: actions.addComment(article.slug, model.comment) }, "Post Comment")
            )
          ),
          model.comments.map(comment =>
            m(".card",
              m(".card-block",
                m("p.card-text", comment.body)
              ),
              m(".card-footer",
                m("a.comment-author[href='']",
                  m("img.comment-author-img", { src: comment.author.image })
                ),
                m.trust("&nbsp;"),
                m("a.comment-author[href='']", comment.author.username),
                m("span.date-posted", new Date(comment.createdAt).toDateString()),
                m("span.mod-options",
                  m("i.ion-edit"),
                  m("i.ion-trash-a", { onclick: actions.deleteComment(article.slug, comment.id) } )
                )
              )
            )
          )
        )
      )
    )
  );
};
