﻿using Orchard.Recipes.Models;

namespace Orchard.Recipes.Services {
    public interface IRecipeJournal : IDependency {
        void StartExecution(string executionId);
        void ExecutionComplete(string executionId);
        void ExecutionFailed(string executionId);
        void WriteJournalEntry(string executionId, string message);
        RecipeJournal GetRecipeJournal(string executionId);
    }
}
