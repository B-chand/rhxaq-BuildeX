CREATE DATABASE TaskManagerDB;
GO
USE TaskManagerDB;
GO

CREATE TABLE Users (
    UserID INT IDENTITY PRIMARY KEY,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    FullName NVARCHAR(100) NOT NULL
);

CREATE TABLE Projects (
    ProjectID INT IDENTITY PRIMARY KEY,
    ProjectName NVARCHAR(100) NOT NULL,
    CreatedBy INT NOT NULL,
    CONSTRAINT FK_Project_User
        FOREIGN KEY (CreatedBy) REFERENCES Users(UserID)
);

CREATE TABLE Tasks (
    TaskID INT IDENTITY PRIMARY KEY,
    Title NVARCHAR(150) NOT NULL,
    Status NVARCHAR(20) NOT NULL
        CHECK (Status IN ('Pending','In Progress','Completed')),
    ProjectID INT NOT NULL,
    AssignedTo INT NOT NULL,
    CONSTRAINT FK_Task_Project
        FOREIGN KEY (ProjectID) REFERENCES Projects(ProjectID),
    CONSTRAINT FK_Task_User
        FOREIGN KEY (AssignedTo) REFERENCES Users(UserID)
);
