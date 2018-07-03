using System;
using System.Collections.Generic;
using DAL;
using Model;

namespace BLL
{
    public class ArticleLogic
    {
        public void DeleteArticle(int id)
        {
            new ArticleDAL().Delete(id);
        }

        public void DeleteArticle(string ids)
        {
            foreach (string id in ids.Split('^'))
            {
                if (string.IsNullOrWhiteSpace(id)) continue;
                new ArticleDAL().Delete(int.Parse(id));
            }
        }

        public int SaveArticle(ArticleInfo ArticleInfo)
        {
            ReplaceChar(ArticleInfo);
            if (ArticleInfo.ID == null)
            {
                return new ArticleDAL().Add(ArticleInfo);
            }
            new ArticleDAL().Update(ArticleInfo);
            return ArticleInfo.ID ?? 0;
        }

        private void ReplaceChar(ArticleInfo ArticleInfo)
        {
            ArticleInfo.Note = ArticleInfo.Note.Replace("xiaoyuhao", "<");
            ArticleInfo.Note = ArticleInfo.Note.Replace("dayuhao", ">");
            ArticleInfo.Note = ArticleInfo.Note.Replace("dengyuhao", "=");
            ArticleInfo.Note = ArticleInfo.Note.Replace("kongge", " ");
            ArticleInfo.Note = ArticleInfo.Note.Replace("aisierxi", "src");
            ArticleInfo.Note = ArticleInfo.Note.Replace("wenhao", "?");
            ArticleInfo.Note = ArticleInfo.Note.Replace("xiegang", "/");
            ArticleInfo.Note = ArticleInfo.Note.Replace("xiegangr", "\r");
            ArticleInfo.Note = ArticleInfo.Note.Replace("xiegangn", "\n");
            ArticleInfo.Note = ArticleInfo.Note.Replace("maohao", ":");
            ArticleInfo.Note = ArticleInfo.Note.Replace("baifenhao", "%");
            ArticleInfo.Note = ArticleInfo.Note.Replace("xiaofenhao", ";");
        }

        public ArticleInfo GetByID(string ID)
        {
            return new ArticleDAL().GetByID(int.Parse(ID));
        }
        public List<ArticleInfo> Query(string DicIDs, string Title, string BigPictureDisplay, int pageIndex, int pageSize, ref int totalItems, ref int PagesLength)
        {
            return new ArticleDAL().Query(DicIDs, Title, BigPictureDisplay,pageIndex, pageSize, ref totalItems, ref PagesLength);
        }
    }
}


