CREATE PROCEDURE UpdateTaskStatus
    @TaskID INT,
    @NewStatus NVARCHAR(20)
AS
BEGIN
    DECLARE @CurrentStatus NVARCHAR(20);

    SELECT @CurrentStatus = Status
    FROM Tasks
    WHERE TaskID = @TaskID;

    IF @CurrentStatus IS NULL
    BEGIN
        RAISERROR('Task not found',16,1);
        RETURN;
    END

    IF (
        (@CurrentStatus = 'Pending' AND @NewStatus = 'In Progress') OR
        (@CurrentStatus = 'In Progress' AND @NewStatus = 'Completed')
    )
    BEGIN
        UPDATE Tasks
        SET Status = @NewStatus
        WHERE TaskID = @TaskID;
    END
    ELSE
    BEGIN
        RAISERROR('Invalid task status transition',16,1);
    END
END;
GO
