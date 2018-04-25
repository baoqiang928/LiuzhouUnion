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
            if (ArticleInfo.ID == null)
            {
                return new ArticleDAL().Add(ArticleInfo);
            }
            new ArticleDAL().Update(ArticleInfo);
            return ArticleInfo.ID ?? 0;
        }

        public ArticleInfo GetByID(string ID)
        {
           return new ArticleDAL().GetByID(int.Parse(ID));
        }
        public List<ArticleInfo> Query(string DicID,string Title, int pageIndex, int pageSize, ref int totalItems, ref int PagesLength)
        {
            return new ArticleDAL().Query(DicID,Title, pageIndex, pageSize, ref totalItems, ref PagesLength);
        }
    }
}


