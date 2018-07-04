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

        private string CleanChar(string src)
        {
            src = src.Replace("xiaoyuhao", "<");
            src = src.Replace("dayuhao", ">");
            src = src.Replace("dengyuhao", "=");
            src = src.Replace("kongge", " ");
            src = src.Replace("wenhao", "?");
            src = src.Replace("xiegang", "/");
            src = src.Replace("xiegangr", "\r");
            src = src.Replace("xiegangn", "\n");
            src = src.Replace("maohao", ":");
            src = src.Replace("baifenhao", "%");
            src = src.Replace("xiaofenhao", ";");
            src = src.Replace("dian", ".");
            src = src.Replace("xiahuaxian", "_");
            src = src.Replace("shuangyinhao", "\"");
            return src;
        }

        private void ReplaceChar(ArticleInfo ArticleInfo)
        {
            ArticleInfo.Note = CleanChar(ArticleInfo.Note);
            ArticleInfo.CoverPicUrl = CleanChar(ArticleInfo.CoverPicUrl);
        }

        public ArticleInfo GetByID(string ID)
        {
            return new ArticleDAL().GetByID(int.Parse(ID));
        }
        public List<ArticleInfo> Query(string DicIDs, string Title, string BigPictureDisplay, int pageIndex, int pageSize, ref int totalItems, ref int PagesLength)
        {
            return new ArticleDAL().Query(DicIDs, Title, BigPictureDisplay, pageIndex, pageSize, ref totalItems, ref PagesLength);
        }
    }
}


